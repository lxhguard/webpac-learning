// 以 ES Modules 的方式导出CreateDivElement函数
export const CreateDivElement = () => {
    const div = document.createElement('div');
    div.innerHTML = 'Please Login';
    return div;
}
  