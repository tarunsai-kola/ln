import React, { useState, useEffect, useMemo, useRef, useCallback, useReducer } from 'react';
import * as Babel from '@babel/standalone';
import * as jsxRuntime from 'react/jsx-runtime';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("React Preview Runtime Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-rose-500">
                        <span className="material-symbols-outlined text-sm">error</span>
                        <span>React Runtime Error</span>
                    </div>
                    <pre className="whitespace-pre-wrap">{this.state.error?.message || String(this.state.error)}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

const ReactLivePreview = ({ code, isDark = true }) => {
    const [renderKey, setRenderKey] = useState(0);
    const [compileError, setCompileError] = useState(null);

    const ParsedComponent = useMemo(() => {
        setCompileError(null);
        if (!code || !code.trim()) return null;

        try {
            // 1. Clean code: strip imports as React and hooks are already injected
            let cleaned = code
                .replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
                .trim();

            // 2. Handle default exports: 'export default function App' -> 'function App'
            cleaned = cleaned.replace(/export\s+default\s+function\s*([a-zA-Z0-9_]*)/g, (match, name) => {
                const fnName = name || '__AnonymousDefaultComponent';
                return `function ${fnName}`;
            });
            cleaned = cleaned.replace(/export\s+default\s+([a-zA-Z0-9_]+);?/g, '/* export default $1 */');

            // 3. Transform JSX to JavaScript using Babel
            const transpiled = Babel.transform(cleaned, {
                presets: ['react'],
                filename: 'user_component.jsx'
            }).code;

            // 4. Create function that evaluates component and returns the main component
            const evaluator = new Function(
                'React',
                'useState',
                'useEffect',
                'useRef',
                'useMemo',
                'useCallback',
                'useReducer',
                '_jsx',
                '_jsxs',
                '_Fragment',
                `
                ${transpiled}

                if (typeof App !== 'undefined') return App;
                if (typeof __AnonymousDefaultComponent !== 'undefined') return __AnonymousDefaultComponent;
                if (typeof Solution !== 'undefined') return Solution;
                if (typeof Main !== 'undefined') return Main;
                if (typeof Counter !== 'undefined') return Counter;
                if (typeof TodoApp !== 'undefined') return TodoApp;

                // Return the last defined function if any
                return null;
                `
            );

            const Component = evaluator(
                React,
                useState,
                useEffect,
                useRef,
                useMemo,
                useCallback,
                useReducer,
                jsxRuntime.jsx,
                jsxRuntime.jsxs,
                jsxRuntime.Fragment
            );

            if (!Component) {
                setCompileError("No React component found. Please define a component named 'App' or 'function App() { ... }'.");
                return null;
            }

            return Component;
        } catch (err) {
            setCompileError(err.message);
            return null;
        }
    }, [code, renderKey]);

    const handleReset = () => {
        setRenderKey(prev => prev + 1);
    };

    return (
        <div className={`h-full flex flex-col rounded-xl overflow-hidden ${
            isDark ? 'bg-[#0f172a] text-slate-200' : 'bg-gray-50 text-gray-800'
        }`}>
            {/* Top Toolbar */}
            <div className={`px-4 py-2 border-b flex items-center justify-between text-xs ${
                isDark ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-white border-gray-200 text-gray-600'
            }`}>
                <div className="flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>Live Component Preview</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                        Interactive
                    </span>
                </div>
                <button
                    onClick={handleReset}
                    title="Reset Component State"
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
                        isDark ? 'hover:bg-slate-800 text-slate-300 hover:text-white' : 'hover:bg-gray-200 text-gray-700'
                    }`}
                >
                    <span className="material-symbols-outlined text-[14px]">replay</span>
                    <span>Reset UI</span>
                </button>
            </div>

            {/* Preview Canvas Area */}
            <div className="flex-1 p-6 overflow-y-auto">
                {compileError ? (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs space-y-2">
                        <div className="flex items-center gap-2 font-bold text-rose-500">
                            <span className="material-symbols-outlined text-sm">warning</span>
                            <span>JSX Compilation Error</span>
                        </div>
                        <pre className="whitespace-pre-wrap">{compileError}</pre>
                    </div>
                ) : ParsedComponent ? (
                    <ErrorBoundary key={renderKey}>
                        <div className="w-full">
                            <ParsedComponent />
                        </div>
                    </ErrorBoundary>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 text-xs py-12">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">smart_toy</span>
                        <p>Write your React component and define <code>function App()</code> to see it rendered live here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReactLivePreview;
