export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "home",
            },
        ],
        currentMenu: null
    },
    mutations: {
        // mutations用来改变第一个对象state的值
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, value) {
            if (value.name !== 'home') {
                state.currentMenu = value
                const result = state.tabsList.findIndex(item => item.name === value.name)
                if (result === -1) {
                    state.tabsList.push(value)
                    // console.log(state.tabsList)
                } else {
                    state.currentMenu = null
                }
            }
        },
        closeTag(state, value) {
            const result = state.tabsList.findIndex(item => item.name === value.name)
            state.tabsList.splice(result, 1)
        }
    },
};
