# Zotero for DeepSeek Harness

将本地 Zotero 桌面版文献库接入 DeepSeek Harness。此仓库已从 Codex/OpenAI 插件清单改造成原生 DeepSeek Harness Cordis 插件包，保留原有 Zotero 操作能力，不依赖 OpenAI/Codex 运行时，也不需要额外的模型 API Key。

## 功能

- 检查并启用 Zotero 本地 API（默认 `http://127.0.0.1:23119`）
- 搜索文献，列出条目、分类、标签和群组
- 导出 BibTeX，同步 `references.bib`
- 向 LaTeX 或 Markdown 草稿插入引用
- 按需读取附件地址和 Zotero 已索引的全文
- 经用户确认后，通过 Zotero Connector 导入 BibTeX/RIS

## 环境要求

- DeepSeek Harness，且当前配置包含技能注册与 `skill` 工具（标准配置默认包含）
- Zotero Desktop
- Python 3；辅助脚本只使用 Python 标准库

## 安装

在 DeepSeek Harness 的插件管理页输入以下 GitHub 地址并安装：

```text
https://github.com/YunchiWu/zotero.git
```

也可以安装本地插件包，选择本仓库根目录。插件包入口为 `package.json` 中的 `dsh.bundle.patch`。

安装后，插件会向 Harness 注册名为 `zotero` 的全局技能。新会话会自动发现它，也可以输入 `/zotero` 显式调用。

如果同一个插件版本曾从其他目录安装，切换安装来源后建议重启 DeepSeek Harness，以清除运行进程缓存的旧模块和元数据路径；发布新版本后重新安装也会触发刷新。

## 使用示例

```text
/zotero 检查我的 Zotero 本地 API 是否可用
```

```text
在我的 Zotero 文献库中搜索 transformer，列出标题、作者、年份和 BibTeX key
```

```text
把 Zotero 文献库导出到 references.bib
```

```text
在 Zotero 中找到 Attention Is All You Need，并将引用插入 paper.tex
```

## 插件结构

- `index.js`：通过 `ctx.skills.register()` 注册 Harness 技能
- `cordis.patch.yml`：Cordis 插件加载清单
- `locale/`：插件管理页的中英文元数据
- `skills/zotero/SKILL.md`：模型按需加载的操作说明
- `skills/zotero/scripts/zotero.py`：与 Zotero Desktop 本地 HTTP 服务交互的辅助脚本
- `skills/zotero/references/local-api-routes.md`：按需查阅的本地 API 路由

## 安全说明

普通搜索和导出只访问本机 Zotero。启用/禁用本地 API 会修改 Zotero 的 `prefs.js`，脚本会先创建备份；传入 `--restart` 时还会重启 Zotero。导入文献会写入当前选定的 Zotero 文献库或分类，技能要求助手在操作前确认，脚本本身也要求显式传入 `--yes`。
