#!/bin/bash

echo "🚀 开始安装考勤查询系统依赖..."

# 检查是否安装了 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "❌ 未找到 pnpm，请先安装 pnpm:"
    echo "npm install -g pnpm"
    exit 1
fi

echo "📦 使用 pnpm 安装依赖..."
pnpm install

echo "✅ 依赖安装完成！"
echo ""
echo "🎉 项目设置完成！"
echo ""
echo "运行以下命令开始开发："
echo "pnpm dev"
echo ""
echo "或者构建项目："
echo "pnpm build"
