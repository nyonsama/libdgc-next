# libdgc-next
Yet another useless personal blog application.  
主要使用了next.js和bootstrap

## 部署
```bash
docker build . -t libdgc_next
docker run -d -p 127.0.0.1:3000:3000 -v $HOME/posts:/app/posts libdgc_next
```
然后用了nginx来实现https  

## TODO
### 细碎的TODO
- [x] 搜索框  
- [x] 首页卡片分页  
- [x] 个人信息卡片  
- [ ] 友链  
- [ ] 自定义首页文章排序方式  
- [ ] 自定义首页每页多少个卡片  
- [ ] 为没有实现的页面设置“施工中”页面  
- [ ] 首页卡片显示文章修改时间  
- [ ] 图标  
- [ ] 搜索框的清除按钮  
- [ ] 在“全部tag”中显示tag出现的频率  

### 大一点的TODO
- [ ] 设计NSFW页面  
- [ ] 设计playground页面  

### 稍微远一点的TODO
- [ ] 全文搜索（在服务器端运行）  
- [ ] 动画  
- [ ] （首页）从服务器按需获得文章元数据  
- [ ] 改进MDX渲染后的样式  
- [ ] 暗色模式  
- [ ] 清理代码  

## License
WTFPL