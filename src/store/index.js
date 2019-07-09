import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        newModuleList: [{
                name: '常用',
                id: 101,
                children: [{
                        id: 1011,
                        className: 'text',
                        innerText: '文本'
                    },
                    {
                        id: 1012,
                        className: 'img',
                        innerText: '图片'
                    }
                ]
            },
            {
                name: '互动',
                id: 102,
                children: [{
                    id: 1021,
                    className: 'online-input',
                    innerText: '在线表单'
                }]
            }
        ]
    },
})