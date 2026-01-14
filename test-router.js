// 简单的路由测试脚本
const routerScript = `
// 测试路由跳转
console.log('路由测试开始...');
const pushButton = document.querySelector('button[onclick*="goAbout"]');
if (pushButton) {
  console.log('找到路由跳转按钮，点击它');
  pushButton.click();
  setTimeout(() => {
    const currentPath = window.location.pathname;
    console.log('当前路径:', currentPath);
    if (currentPath === '/about') {
      console.log('✅ 路由跳转成功');
    } else {
      console.log('❌ 路由跳转失败，仍在路径:', currentPath);
    }
  }, 500);
} else {
  console.log('❌ 未找到路由跳转按钮');
}
`;

console.log('将以下脚本复制到浏览器控制台执行:');
console.log(routerScript);