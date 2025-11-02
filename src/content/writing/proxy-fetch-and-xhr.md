---
title: "JS逆向：拦截 Fetch 和 XHR 请求"
description: "JS逆向：代理 Fetch 和 XHR 请求"
pubDate: '2025-11-02 20:30:00'
---

直接上代码

```js
// ==UserScript==
// @name         拦截 Fetch 和 XHR
// @match        https://www.abc.com/*
// @run-at       document-start
// @icon         https://www.google.com/s2/favicons?sz=64&domain=abc.com
// @grant        none
// ==/UserScript==

// ============ 配置区域 ============
const CONFIG = {
    // 启用调试日志
    debug: true,

    // URL 拦截规则配置
    rules: [
        {
            // 规则名称（用于日志）
            name: '订单列表接口',
            // URL 匹配方式：'exact'(精确), 'contains'(包含), 'regex'(正则), 'startsWith'(开头), 'endsWith'(结尾)
            matchType: 'contains',
            // 匹配模式
            pattern: '/abc.json',
            // 是否启用此规则
            enabled: false,
            // 修改响应的函数
            modifier: function(originalData) {
                return deepMerge(originalData, {
                    modified: true,
                    timestamp: Date.now()
                })
            }
        },
    ]
};

function deepMerge(target, source) {
    const result = structuredClone(target);

    Object.keys(source).forEach(key => {
        const sourceValue = source[key];
        const targetValue = result[key];

        // 如果源值是数组
        if (Array.isArray(sourceValue)) {
            if (Array.isArray(targetValue)) {
                // 两者都是数组，按索引合并
                result[key] = sourceValue.map((item, index) => {
                    // 如果目标数组中存在对应索引的元素
                    if (index < targetValue.length) {
                        // 如果两者都是对象，则递归合并
                        if (item && typeof item === 'object' && !Array.isArray(item) &&
                            targetValue[index] && typeof targetValue[index] === 'object') {
                            return deepMerge(targetValue[index], item);
                        }
                    }
                    // 否则直接使用源数组的值
                    return item;
                });
            } else {
                // 目标不是数组，直接使用源数组
                result[key] = sourceValue;
            }
        }
        // 如果源值是对象（非数组）
        else if (sourceValue && typeof sourceValue === 'object') {
            result[key] = targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)
                ? deepMerge(targetValue, sourceValue)
            : sourceValue;
        }
        // 基本类型直接赋值
        else {
            result[key] = sourceValue;
        }
    });

    return result;
}

(function() {
    'use strict';

    // ============ 核心拦截逻辑 ============

    // 日志函数
    function log(type, ...args) {
        if (!CONFIG.debug) return;
        const prefix = '[请求拦截器]';
        const styles = {
            info: 'color: #1890ff',
            success: 'color: #52c41a',
            warning: 'color: #faad14',
            error: 'color: #f5222d'
        };
        console.log(`%c${prefix} [${type.toUpperCase()}]`, styles[type] || '', ...args);
    }

    // URL 匹配函数
    function matchUrl(url, rule) {
        if (!rule.enabled) return false;

        try {
            switch (rule.matchType) {
                case 'exact':
                    return url === rule.pattern;
                case 'contains':
                    return url.includes(rule.pattern);
                case 'startsWith':
                    return url.startsWith(rule.pattern);
                case 'endsWith':
                    return url.endsWith(rule.pattern);
                case 'regex':
                    return rule.pattern.test(url);
                default:
                    log('warning', `未知的匹配类型: ${rule.matchType}`);
                    return false;
            }
        } catch (e) {
            log('error', `规则匹配出错 [${rule.name}]:`, e);
            return false;
        }
    }

    // 查找匹配的规则
    function findMatchingRule(url) {
        for (const rule of CONFIG.rules) {
            if (matchUrl(url, rule)) {
                return rule;
            }
        }
        return null;
    }

    // ============ XHR 拦截 ============
    const OriginalXHR = window.XMLHttpRequest;

    function ProxyXHR() {}

    window.XMLHttpRequest = function() {
        const xhr = new OriginalXHR();
        const proxy = new ProxyXHR();
        proxy._xhr = xhr;
        proxy._url = '';
        proxy._method = '';

        // 创建代理处理器
        const handler = {
            get(target, prop) {
                // 返回原始 XHR 对象（用于内部访问）
                if (prop === '_xhr') {
                    return target._xhr;
                }

                const original = target._xhr[prop];

                // 如果是函数，创建包装函数
                if (typeof original === 'function') {
                    // 特殊处理 open 方法以获取 URL
                    if (prop === 'open') {
                        return function(...args) {
                            target._method = args[0];
                            target._url = args[1];
                            log('info', `[XHR] ${target._method} ${target._url}`);
                            return original.apply(target._xhr, args);
                        };
                    }

                    // 其他方法直接代理
                    return function(...args) {
                        return original.apply(target._xhr, args);
                    };
                }

                // 处理响应相关属性
                if (prop.includes('response')) {
                    const rule = findMatchingRule(target._url);

                    if (rule) {
                        try {
                            const originalResponse = target._xhr[prop];

                            // 只处理 JSON 响应
                            if (typeof originalResponse === 'string') {
                                const originalData = JSON.parse(originalResponse);
                                log('success', `[XHR] 匹配到规则 [${rule.name}]，原始数据:`, originalData);

                                // 执行修改函数
                                const modifiedData = rule.modifier(originalData);
                                log('success', `[XHR] 修改后数据:`, modifiedData);

                                return JSON.stringify(modifiedData);
                            }
                        } catch (e) {
                            log('error', `[XHR] 处理响应时出错 [${rule.name}]:`, e);
                            // 出错时返回原始响应
                            return target._xhr[prop];
                        }
                    }
                }

                // 返回原始属性
                return target._xhr[prop];
            },

            set(target, prop, value) {
                target._xhr[prop] = value;
                return true;
            },

            has(target, key) {
                return key in target._xhr;
            }
        };

        return new Proxy(proxy, handler);
    };

    // 复制原型链
    window.XMLHttpRequest.prototype = OriginalXHR.prototype;

    // ============ Fetch 拦截 ============
    const OriginalFetch = window.fetch;

    window.fetch = async function(...args) {
        // 获取 URL
        const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
        const method = args[1]?.method || 'GET';

        log('info', `[Fetch] ${method} ${url}`);

        // 查找匹配的规则
        const rule = findMatchingRule(url);

        // 调用原始 fetch
        const response = await OriginalFetch.apply(this, args);

        // 如果没有匹配规则，直接返回原始响应
        if (!rule) {
            return response;
        }

        // 克隆响应以便读取
        const clonedResponse = response.clone();

        try {
            // 获取响应文本
            const originalText = await clonedResponse.text();

            // 尝试解析为 JSON
            let originalData;
            try {
                originalData = JSON.parse(originalText);
            } catch (e) {
                log('warning', `[Fetch] 响应不是有效的 JSON，跳过修改 [${rule.name}]`);
                return response;
            }

            log('success', `[Fetch] 匹配到规则 [${rule.name}]，原始数据:`, originalData);

            // 执行修改函数
            const modifiedData = rule.modifier(originalData);
            log('success', `[Fetch] 修改后数据:`, modifiedData);

            // 创建新的响应对象
            const modifiedResponse = new Response(
                JSON.stringify(modifiedData),
                {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                }
            );

            // 复制原始响应的属性
            Object.defineProperty(modifiedResponse, 'url', {
                value: response.url
            });

            return modifiedResponse;

        } catch (e) {
            log('error', `[Fetch] 处理响应时出错 [${rule.name}]:`, e);
            // 出错时返回原始响应
            return response;
        }
    };

    // ============ 初始化日志 ============
    log('success', '✅ XHR/Fetch 拦截器已启动');
    log('info', `已加载 ${CONFIG.rules.filter(r => r.enabled).length} 个启用的规则`);
    CONFIG.rules.filter(r => r.enabled).forEach(rule => {
        log('info', `  - ${rule.name} (${rule.matchType}: ${rule.pattern})`);
    });

    // 页面初始化之后自动刷新一次获取劫持后的数据
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector("#base_bd > div.main > div > div.order_tab_box > div.order_tab > a.current").click()
    });
})();
```
