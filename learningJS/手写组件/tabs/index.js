class XTabs {
    constructor(id) {
        this.main = document.querySelector(id)
        this.lis = this.main.querySelector('li')
        this.section = this.main.querySelectorAll('section')
        console.log('初始化Xtab', this.lis)
    }
    addTab() {

    }
    removeTab() {

    }
    changeTab() {

    }
    editTab() {

    }
    bindTab() {

    }
}
new XTabs('#tab')
