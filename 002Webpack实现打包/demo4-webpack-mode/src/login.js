// 以 ES Modules 的方式导出CreateDivElement函数
export const CreateDivElement = title => {
    const div = document.createElement('div');
    div.innerHTML = 'Please Login' + title;
    return div;
}
  