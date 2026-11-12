# Prompt Pilot 完整评估

- 生成时间：2026-11-12T05:25:23.627Z
- Node：v24.14.1
- 命令：`node scripts/eval-prompt-pilot.mjs`
- 结果：**PASS**

## 本地完整草稿用例

| 用例 | 期望类别 | 实际类别 | 长度 | 结果 | 实际草稿 |
| --- | --- | --- | ---: | --- | --- |
| explicit-zh-next-step | next-step | next-step | 74 字 | PASS | 继续当前任务。下一步：把这两条不够稳定的实时断言改成可跳过。开始前先确认最新结论、改动范围和验收标准；完成后运行相关验证，并汇报结果、风险和下一步。 |
| bold-next-step | next-step | next-step | 62 字 | PASS | 继续当前任务。下一步：补齐发布文档。开始前先确认最新结论、改动范围和验收标准；完成后运行相关验证，并汇报结果、风险和下一步。 |
| list-next-step | next-step | next-step | 64 字 | PASS | 继续当前任务。下一步：跑一遍端到端测试。开始前先确认最新结论、改动范围和验收标准；完成后运行相关验证，并汇报结果、风险和下一步。 |
| heading-next-step | next-step | next-step | 72 字 | PASS | 继续当前任务。下一步：把 README 的安装步骤补全。开始前先确认最新结论、改动范围和验收标准；完成后运行相关验证，并汇报结果、风险和下一步。 |
| english-next-step | next-step | next-step | 38 词 | PASS | Continue the current task. Next step: run the failing test. Before starting, confirm the latest conclusion, the change scope, and the acceptance checks; when done, run the relevant verification and report the result, risks, and the next step. |
| error-zh-diagnostic | error | error | 56 字 | PASS | 先复现并定位刚才的失败：给出报错摘要、复现命令和根因假设；修复后运行同一验证，对比修复前后的结果并说明剩余风险。 |
| error-en-diagnostic | error | error | 32 词 | PASS | Reproduce and localize the failure: give the error summary, the reproduction command, and a root-cause hypothesis; after fixing it, run the same verification, compare before and after, and state the remaining risks. |
| error-with-next-step | next-step | next-step | 62 字 | PASS | 继续当前任务。下一步：修复登录接口。开始前先确认最新结论、改动范围和验收标准；完成后运行相关验证，并汇报结果、风险和下一步。 |
| no-error-completed | completed | completed | 66 字 | PASS | 基于刚才完成的结果继续：检查改动是否覆盖目标，运行相关测试或构建并整理可复现步骤；确认通过后提交并推送，最后汇报结果、风险和下一步。 |
| question-options | question | question | 57 字 | PASS | 按你刚才的建议继续：请先说明你推荐哪个方案以及关键理由，再直接执行；完成后运行相关验证，并汇报结果、风险和下一步。 |
| question-yes-no | question | question | 57 字 | PASS | 按你刚才的建议继续：请先说明你推荐哪个方案以及关键理由，再直接执行；完成后运行相关验证，并汇报结果、风险和下一步。 |
| question-before-next-step | next-step | next-step | 62 字 | PASS | 继续当前任务。下一步：补齐发布文档。开始前先确认最新结论、改动范围和验收标准；完成后运行相关验证，并汇报结果、风险和下一步。 |
| completed-without-error | completed | completed | 66 字 | PASS | 基于刚才完成的结果继续：检查改动是否覆盖目标，运行相关测试或构建并整理可复现步骤；确认通过后提交并推送，最后汇报结果、风险和下一步。 |
| plan-signal | plan | plan | 55 字 | PASS | 按上面的计划开始执行：先完成第一步并说明目标、范围和验收标准；每完成一步运行验证，最后汇总结果、风险与剩余项。 |
| changed-files | review-changes | review-changes | 56 字 | PASS | 请审查刚才的改动：先列出改动范围和目的，再运行相关测试或构建，指出风险、遗漏和回滚方式；确认无误后整理提交信息。 |
| review-intent | follow-up-review | follow-up-review | 60 字 | PASS | 请继续审查当前实现：重点检查边界条件、错误处理、权限与数据一致性；给出按优先级排序的问题和具体修复建议，并运行相关验证。 |
| test-intent | follow-up-tests | follow-up-tests | 48 字 | PASS | 请补充边界和失败路径测试：说明覆盖点，构造输入并运行测试；测试通过后汇报新增用例和仍存在的风险。 |
| deploy-intent | follow-up-deploy | follow-up-deploy | 49 字 | PASS | 请准备发布：先核对版本、配置和回滚步骤，再运行发布前验证；列出风险、依赖和回滚方案，确认后再执行。 |
| session-title-only | session-title | session-title | 57 字 | PASS | 继续当前任务「金融终端重构」：先总结已完成部分和未完成项，再给出一个具体的下一步并执行；完成后运行验证并汇报结果。 |
| blank-starter | starter | starter | 58 字 | PASS | 请先通读当前项目结构和关键入口，说明你理解的目标、约束和风险，再提出一个可执行的第一步；先不要改代码，等我确认方案。 |
| stale-assistant | follow-up-review | follow-up-review | 60 字 | PASS | 请继续审查当前实现：重点检查边界条件、错误处理、权限与数据一致性；给出按优先级排序的问题和具体修复建议，并运行相关验证。 |
| running | null | null | 0 字 | PASS |  |
| recommendation-lead | next-step | next-step | 82 字 | PASS | 继续当前任务。下一步：我建议：把 PCR 改成基于认购认沽成交额的本地聚合。开始前先确认最新结论、改动范围和验收标准；完成后运行相关验证，并汇报结果、风险和下一步。 |
| tool-error-fresh-diagnostic | error | error | 32 词 | PASS | Reproduce and localize the failure: give the error summary, the reproduction command, and a root-cause hypothesis; after fixing it, run the same verification, compare before and after, and state the remaining risks. |
| stale-tool-error | follow-up-review | follow-up-review | 60 字 | PASS | 请继续审查当前实现：重点检查边界条件、错误处理、权限与数据一致性；给出按优先级排序的问题和具体修复建议，并运行相关验证。 |
| fenced-next-step-is-ignored | assistant-followup | assistant-followup | 60 字 | PASS | 基于上面的结论继续：先总结已经确认的结果和未决问题，再提出一个具体下一步并执行；完成后运行验证并汇报结果、风险和下一步。 |
| does-not-repeat-last-prompt | follow-up-review | follow-up-review | 60 字 | PASS | 请继续审查当前实现：重点检查边界条件、错误处理、权限与数据一致性；给出按优先级排序的问题和具体修复建议，并运行相关验证。 |
| long-context-budget | next-step | next-step | 74 字 | PASS | 继续当前任务。下一步：把这两条不够稳定的实时断言改成可跳过。开始前先确认最新结论、改动范围和验收标准；完成后运行相关验证，并汇报结果、风险和下一步。 |
| english-starter | starter | starter | 34 词 | PASS | First read the current project structure and key entry points, then state the goal, constraints, and risks you understand and propose one executable first step. Do not change code until I confirm the plan. |
| english-plan | plan | plan | 29 词 | PASS | Start executing the plan above: complete the first step and state its goal, scope, and acceptance checks; verify after each step, then summarize the result, risks, and remaining work. |

- 通过：30/30
- 失败：0

## 质量约束

- 每条建议都是完整草稿（长度、目标/验收信息）：PASS
- 没有短句回退路径：PASS
- 报错时仍给出完整诊断草稿：PASS
- 接受后删除草稿可再次出现（不做 accepted 冷却）：PASS
- 上下文预算有硬上限：PASS
- Chat 新鲜度检查：PASS
- 本地生成器无网络绑定：PASS
- 所有 fetch 都指向同源插件路由：PASS

## 本地性能与预算

- 5000 次本地草稿生成：101.0 ms，平均 0.020 ms，p95 0.030 ms
- 超长上下文调用：1.441 ms，返回长度 74，上限检查：PASS
- 本地上下文硬上限：assistant=4000 字符，tool=1600 字符，lastUser=1200 字符，title=120 字符
- 本地草稿：0 模型 token、0 网络调用；只有启用 AI 完善且同上下文缓存未命中时才发一次请求，输出预算 1600 tokens（最低推理强度；思考占满且无文本时翻倍重试一次，上限 4096）。

## Host AI 路由合约（fake llm，无网络）

| 检查 | 结果 | 说明 |
| --- | --- | --- |
| reject missing same-origin gate | PASS | status=403 |
| reject non-POST | PASS | status=405 |
| reject invalid JSON | PASS | status=400 |
| empty context returns no suggestion without a model call | PASS |  |
| valid call returns a prompt | PASS |  |
| auth gate and route registered | PASS |  |
| bounded output budget | PASS | maxTokens=1600 |
| no tools on the suggestion call | PASS |  |
| system instructs a full prompt, not a short phrase | PASS |  |
| conversation context reaches the model | PASS |  |
| same context reuses the host cache | PASS |  |
| host clips oversized context before the model call | PASS | status=200 |
| strips fences and wrapper quotes | PASS |  |
| SKIP becomes no suggestion | PASS |  |
| too-short model output falls back instead of replacing the local draft | PASS |  |
| model failure returns a clean fallback signal, not a crash | PASS |  |
| missing model returns no suggestion without a call | PASS |  |
| rate limit protects immediate distinct calls | PASS |  |

- 通过：18/18

## 结论

本地完整草稿、AI 路由鉴权/缓存/预算/失败回退、接受后重现、上下文上限和静态网络审计全部通过。AI 路径按“同一上下文只调用一次”计费；离线时保留完整的本地草稿。
