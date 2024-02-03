# GitHub静态站点部署

1. 将项目代码提交至GitHub仓库，假设此时项目仓库的地址是`https://github.com/<username>/<project-name>`

2. 配置公共基础路径（以[vite](https://cn.vitejs.dev/guide/static-deploy#github-pages)为例）：

   ```typescript
   // vite.config.ts
   export default defineConfig({
     // 填入仓库地址中的项目名
     base: '/<project-name>/'
   })
   ```

3. 开启GitHub Pages，按下图所示顺序操作：

   ![image-20240203160951393](@/assets/images/image-20240203160951393.png)

   这里选择GitHub Actions，可实现在每次提交代码后自动构建和部署。

4. 配置GitHub Actions：

   ![image-20240203161616645](@/assets/images/image-20240203160951393.png)

   按上图点击后，输入如下配置，然后点击提交即可：

   ```yaml
   # 将静态内容部署到 GitHub Pages 的简易工作流程
   name: Deploy static content to Pages

   on:
     # 仅在推送到默认分支时运行。
     push:
       branches: ['main']

     # 这个选项可以使你手动在 Action tab 页面触发工作流
     workflow_dispatch:

   # 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages。
   permissions:
     contents: read
     pages: write
     id-token: write

   # 允许一个并发的部署
   concurrency:
     group: 'pages'
     cancel-in-progress: true

   jobs:
     # 单次部署的工作描述
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Set up Node
           uses: actions/setup-node@v3
           with:
             node-version: 18

         # 安装 pnpm, 并使用缓存节省安装时间
         - name: Install pnpm
           uses: pnpm/action-setup@v2
           with:
             version: 8
             run_install: false
         - name: Get pnpm store directory
           shell: bash
           run: |
             echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
         - name: Setup pnpm cache
           uses: actions/cache@v3
           with:
             path: ${{ env.STORE_PATH }}
             key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
             restore-keys: |
              ${{ runner.os }}-pnpm-store-

         - name: Install dependencies
           run: pnpm install

         - name: Build
           run: npm run build

         - name: Setup Pages
           uses: actions/configure-pages@v3

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v2
           with:
             # Upload dist repository
             path: './dist'

         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v2

   ```

   再次点击GitHub Actions即可看到工作流运行情况。

5. 完成后访问`https://<username>.github.io/<project-name>/`就可以看到部署后的站点了。
