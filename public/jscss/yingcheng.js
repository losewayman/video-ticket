/*var datas = null;
window.onload = function() {
    $.ajax({
        url: "/getall",
        type: "POST",
        //type:"POST",
        data: {
            table: "page"
        },
        success: function(data) {

            datas = JSON.parse(data);
            console.log(datas);
*/

var head = new Vue({
    el: '#head',
    data: {

        right_items: [
            { href: '#', class: 'head_dl', message: '登录' },
            { href: '#', class: 'head_zc', message: '注册' }
        ]
    },
    methods: {
        enter: function(num) {
            this.left_items[num].show = true
        },
        leave: function(num) {
            this.left_items[num].show = false
        },
    }

})

var lunbo = new Vue({
    el: '#lun_body',
    data: {
        index: 0,
        num: 0,
        luntu: 0,
        lunbos: [
            { show: true, class1: 'lun', class2: 'lun_1' },
            { show: true, class1: 'lun', class2: 'lun_2' },
            { show: true, class1: 'lun', class2: 'lun_3' },
            { show: true, class1: 'lun', class2: 'lun_4' },
            /*{ show: true, class1: 'lun', class2: 'lun_5' },
            { show: true, class1: 'lun', class2: 'lun_6' }*/

        ]
    },
    methods: {
        enter: function() {
            stoplunbo();
        },
        leave: function() {
            lunbotu = setInterval(function() { lunboxun(); }, 3500);
        },
    },
    computed: {
        width: function() {
            this.num = this.lunbos.length;
            return this.num * 100
        },
        widths: function() {
            this.num = this.lunbos.length;
            return 100 / this.num
        },
        icont: function() {
            return 50 * this.lunbos.length
        },
    }
})

var zujianone = {
    props: ['bodyer'],
    template: '<div class="bodydiv"><div class="bodydiv1"><img class="bodyimg" v-bind:src="bodyer.imgsrc"></div><div class="bodydiv2"><span>{{bodyer.h}}</span><p>{{bodyer.p}}</p><p><a v-for="ap in bodyer.aps" v-bind:href=ap.href>{{ap.p}}</a></p></div></div>'
}
var zujiantwo = {
    props: ['bodyer'],
    template: '<div class="zutwo"><div class="zutwo1"><img class="zutwoimg" v-bind:src="bodyer.imgsrc"></div><div class="zutwo2"><span>{{bodyer.h}}</span><p>{{bodyer.p}}</p></div></div>'
}
var zujianthree = {
    props: ['bodyer'],
    template: '<div class="zuthree"><a v-bind:href="bodyer.href"><div class="imgdiv"><img class="image" v-bind:src="bodyer.imgsrc"></div><div id="textdiv"><p class="textdiv-p1">{{bodyer.p1}}</p><p class="textdiv-p2">{{bodyer.p2}}</p></div></a></div>'
}
var bodyone = new Vue({
    el: '#content-1',
    data: {
        titlep: '最新大片',
        bodyones: [
            { id: 0, imgsrc: '../img/a.jpg', h: '毒战', p: '简介：贝克（布兰顿·思怀兹 Brenton Thwaites 饰）只是一介平凡的人类窃贼，却在意外之中成为了拯救人类的唯一希望。为了对抗强大的赛特，他千里迢迢找到了荷鲁斯，向他寻求帮助。就这样，一人一神的奇怪组合成立了...' },
            { id: 1, imgsrc: '../img/b.jpg', h: '毒战', p: '简介： 该片是《X战警》系列电影的外传。讲述了前任特种兵韦德·威尔逊得了不治之症，而自愿加入“X武器计划”获得了快速自愈能力。在饱受虐待折磨后他成功逃脱并对Ajax进行追杀的故...' },
            { id: 2, imgsrc: '../img/e.jpg', h: '毒战', p: '刚刚结束一次危险任务的津海市缉毒大队队长张雷（孙红雷 饰），在医院意外见到因车祸入院治疗的香港人蔡添明（古天乐 饰），身经百战的张队迅速判定蔡与毒品勾当有关...' },
            { id: 3, imgsrc: '../img/d.jpg', h: '鲸奇', p: '小镇上的记者亚当（约翰·卡拉辛斯基 John Krasinski 饰）和绿色和平组织的一位志愿者瑞秋（德鲁·巴里摩尔 Drew Barrymore 饰）加入到了拯救北极圈灰鲸的行动中去。 两人必须联合阿拉斯加的因纽特人，对抗石油公司以及苏联和美国的军队的反对' }
        ]
    },
    components: {
        'component-one': zujianone,
    }
})

var bodytwo = new Vue({
    el: '#content-2',
    data: {
        contentp: {
            p1: '一站式视频点播和直播解决方案',
            p2: '集成存储与融合 CDN，汇聚七牛强大的数据处理能力，提供直播、录制、转码、发布、加速、播放等一站式视频直播、点播服务。'
        },
        bodytwos: [
            { id: 0, imgsrc: 'img/icon2.png', h: '流畅', p: '视频方案的基础在于播放的流畅性。七牛云从推流端到播放端每一个环节都进行了极致的流畅性优化。' },
            { id: 0, imgsrc: 'img/icon2.png', h: '高效', p: '提供端到端的完整方案，让原有需要超过六个月的产品开发工作简化到一个月内就可完成上线。' },
            { id: 0, imgsrc: 'img/icon2.png', h: '低成本', p: '我们采用了各种可靠的技术方式，包括内容压缩、P2P 传输、H.265 编码、自适应码流等手段来降低成本。' },
            { id: 0, imgsrc: 'img/icon2.png', h: '可控', p: '充分发挥大数据和机器学习的优势，以最实时的方式监测服务质量，并能以开放的方式进行深度的业务分析。' }
        ]
    },
    components: {
        'component-two': zujiantwo,
    }
})

var bodythree = new Vue({
        el: '#content-3',
        data: {
            content3h: '热门推荐',
            content3lis: [
                { href: '#', content: '海外大片' },
                { href: '#', content: '国内老片' },
                { href: '#', content: '幽默电影' },
                { href: '#', content: '恐怖电影' }
            ],
            content3cards: [
                { id: 0, href: '#', imgsrc: '../img/x.jpg', p1: '国内老片', p2: '书生与女鬼不可说的故事' },
                { id: 1, href: '#', imgsrc: '../img/y.jpg', p1: '国内老片', p2: '又是许仙和白娘子的恩恩怨怨' },
                { id: 2, href: '#', imgsrc: '../img/z.jpg', p1: '国内老片', p2: '假如上天再给我一次机会' },
            ]
        },
        components: {
            'component-three': zujianthree,
        }

    })
    // },
    //error: function() {
    //   console.log("post请求出错");
    //}
    /* })*/
    //}






var lz = 0;
var lb = 0;
var lun = document.getElementById("content_lunbo");

function lunboxun() {
    console.log();
    lun.firstChild.style.marginLeft = '-100%';
    setTimeout(function() {
        lun.firstChild.style.marginLeft = '0%';
        lb = lun.firstChild.cloneNode(true);
        lun.removeChild(lun.firstChild);
        lun.appendChild(lb);
    }, 2500);
}

function stoplunbo() {
    clearInterval(lunbotu);
}

function icontedit(index) {
    while (lun.firstChild.className != lunbo.lunbos[index].class1 + " " + lunbo.lunbos[index].class2) {
        lz = lun.firstChild.cloneNode(true);
        lun.removeChild(lun.firstChild);
        lun.appendChild(lz);
    }
}

var lunbotu = setInterval(function() { lunboxun(); }, 3500);