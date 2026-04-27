// 词汇库 - 预设常见主题的词汇数据
const vocabularyDatabase = {
    "超市": {
        icon: "🛒",
        title: "《走进超市》",
        core: ["shōu yín yuán 收银员", "huò jià 货架", "gòu wù chē 购物车"],
        items: [
            "píng guǒ 苹果", "niú nǎi 牛奶", "miàn bāo 面包",
            "jī dàn 鸡蛋", "shū cài 蔬菜", "shuǐ guǒ 水果",
            "yǐn liào 饮料", "líng shí 零食"
        ],
        environment: ["chū kǒu 出口", "rù kǒu 入口", "dēng 灯", "qiáng 墙", "dì bǎn 地板"]
    },

    "医院": {
        icon: "🏥",
        title: "《快乐医院》",
        core: ["yī shēng 医生", "hù shi 护士", "bìng chuáng 病床"],
        items: [
            "tīng zhěn qì 听诊器", "yào 药", "zhēn tǒng 针筒",
            "tǐ wēn jì 体温计", "kǒu zhào 口罩", "bēi zi 杯子",
            "bìng lì 病历"
        ],
        environment: ["zhěn shì 诊室", "mén 门", "chuāng hu 窗户", "yǐ zi 椅子", "zhuō zi 桌子"]
    },

    "公园": {
        icon: "🌳",
        title: "《美丽的公园》",
        core: ["huá tī 滑梯", "qiū qiān 秋千", "shā chí 沙池"],
        items: [
            "qiú 球", "fēng zheng 风筝", "zì xíng chē 自行车",
            "cǎo dì 草地", "cháng yǐ 长椅", "lā jī tǒng 垃圾桶",
            "shuǐ hú 水壶"
        ],
        environment: ["shù 树", "huā 花", "cǎo 草", "tiān kōng 天空", "yún 云"]
    },

    "学校": {
        icon: "🏫",
        title: "《我爱上学》",
        core: ["lǎo shī 老师", "xué sheng 学生", "hēi bǎn 黑板"],
        items: [
            "shū 书", "bǐ 笔", "běn zi 本子", "shū bāo 书包",
            "kè zhuō 课桌", "yǐ zi 椅子", "chǐ zi 尺子",
            "xiàng pí 橡皮"
        ],
        environment: ["jiào shì 教室", "mén 门", "chuāng hu 窗户", "dēng 灯", "qiáng 墙"]
    },

    "餐厅": {
        icon: "🍽️",
        title: "《美味餐厅》",
        core: ["chú shī 厨师", "fú wù yuán 服务员", "cān zhuō 餐桌"],
        items: [
            "pán zi 盘子", "wǎn 碗", "kuài zi 筷子", "sháo zi 勺子",
            "bēi zi 杯子", "cài dān 菜单", "cān jīn 餐巾",
            "yǐn liào 饮料"
        ],
        environment: ["yǐ zi 椅子", "dēng 灯", "chuāng hu 窗户", "mén 门", "qiáng 墙"]
    },

    "动物园": {
        icon: "🦁",
        title: "《动物园之旅》",
        core: ["sì yǎng yuán 饲养员", "dà xiàng 大象", "shī zi 狮子"],
        items: [
            "hóu zi 猴子", "lǎo hǔ 老虎", "xióng māo 熊猫",
            "cháng jǐng lù 长颈鹿", "bān mǎ 斑马", "niǎo 鸟",
            "zhào xiàng jī 照相机"
        ],
        environment: ["shù 树", "cǎo 草", "lán gān 栏杆", "zhǐ shì pái 指示牌", "tiān kōng 天空"]
    },

    "图书馆": {
        icon: "📚",
        title: "《书的海洋》",
        core: ["guǎn lǐ yuán 管理员", "shū jià 书架", "yuè dú qū 阅读区"],
        items: [
            "shū 书", "zá zhì 杂志", "bào zhǐ 报纸", "diàn nǎo 电脑",
            "tái dēng 台灯", "shū qiān 书签", "bǐ jì běn 笔记本",
            "bēi zi 杯子"
        ],
        environment: ["zhuō zi 桌子", "yǐ zi 椅子", "chuāng hu 窗户", "dēng 灯", "qiáng 墙"]
    },

    "游乐场": {
        icon: "🎡",
        title: "《欢乐游乐场》",
        core: ["mó tiān lún 摩天轮", "guò shān chē 过山车", "xuán zhuǎn mù mǎ 旋转木马"],
        items: [
            "bīng qí lín 冰淇淋", "bào mǐ huā 爆米花", "qì qiú 气球",
            "mén piào 门票", "bèi bāo 背包", "shuǐ 水",
            "zhào piàn 照片"
        ],
        environment: ["tiān kōng 天空", "yún 云", "shù 树", "cǎo dì 草地", "zhǐ shì pái 指示牌"]
    },

    "海滩": {
        icon: "🏖️",
        title: "《快乐海滩》",
        core: ["hǎi làng 海浪", "shā tān 沙滩", "tài yáng sǎn 太阳伞"],
        items: [
            "yóu yǒng quān 游泳圈", "shā zi 沙子", "bèi ké 贝壳",
            "shuǐ tǒng 水桶", "chǎn zi 铲子", "tài yáng jìng 太阳镜",
            "máo jīn 毛巾", "fān chuán 帆船"
        ],
        environment: ["dà hǎi 大海", "tiān kōng 天空", "yún 云", "tài yáng 太阳", "shā tān 沙滩"]
    },

    "农场": {
        icon: "🚜",
        title: "《快乐农场》",
        core: ["nóng mín 农民", "niú 牛", "jī 鸡"],
        items: [
            "zhū 猪", "yáng 羊", "mǎ 马", "yā zi 鸭子",
            "mài zi 麦子", "shū cài 蔬菜", "shuǐ guǒ 水果",
            "tuō lā jī 拖拉机"
        ],
        environment: ["gǔ cāng 谷仓", "lí ba 篱笆", "shù 树", "cǎo dì 草地", "tiān kōng 天空"]
    },

    "厨房": {
        icon: "🍳",
        title: "《妈妈的厨房》",
        core: ["mā ma 妈妈", "lú zào 炉灶", "bīng xiāng 冰箱"],
        items: [
            "guō 锅", "wǎn 碗", "pán zi 盘子", "dāo 刀",
            "cài bǎn 菜板", "kuài zi 筷子", "sháo zi 勺子",
            "wēi bō lú 微波炉"
        ],
        environment: ["chuāng hu 窗户", "shuǐ chí 水池", "guì zi 柜子", "dēng 灯", "qiáng 墙"]
    },

    "交通": {
        icon: "🚗",
        title: "《交通工具》",
        core: ["qì chē 汽车", "gōng jiāo chē 公交车", "zì xíng chē 自行车"],
        items: [
            "huǒ chē 火车", "fēi jī 飞机", "chuán 船",
            "mó tuō chē 摩托车", "chū zū chē 出租车", "hóng lǜ dēng 红绿灯",
            "bān mǎ xiàn 斑马线"
        ],
        environment: ["mǎ lù 马路", "tiān kōng 天空", "shù 树", "lóu fáng 楼房", "zhǐ shì pái 指示牌"]
    },

    "水果店": {
        icon: "🍎",
        title: "《水果乐园》",
        core: ["lǎo bǎn 老板", "huò jià 货架", "chēng 秤"],
        items: [
            "píng guǒ 苹果", "xiāng jiāo 香蕉", "jú zi 橘子",
            "xī guā 西瓜", "pú tao 葡萄", "cǎo méi 草莓",
            "lí 梨", "táo zi 桃子"
        ],
        environment: ["kuāng zi 筐子", "dài zi 袋子", "dēng 灯", "mén 门", "qiáng 墙"]
    },

    "幼儿园": {
        icon: "🧸",
        title: "《快乐幼儿园》",
        core: ["lǎo shī 老师", "xiǎo péng you 小朋友", "wán jù 玩具"],
        items: [
            "huá tī 滑梯", "qiū qiān 秋千", "jī mù 积木",
            "huà bǐ 画笔", "zhǐ 纸", "qiú 球",
            "shū 书", "bēi zi 杯子"
        ],
        environment: ["jiào shì 教室", "chuāng hu 窗户", "mén 门", "dēng 灯", "qiáng 墙"]
    },

    "卧室": {
        icon: "🛏️",
        title: "《我的卧室》",
        core: ["chuáng 床", "yī guì 衣柜", "shū zhuō 书桌"],
        items: [
            "zhěn tou 枕头", "bèi zi 被子", "tái dēng 台灯",
            "shū 书", "wán jù 玩具", "nào zhōng 闹钟",
            "chuāng lián 窗帘", "dì tǎn 地毯"
        ],
        environment: ["chuāng hu 窗户", "mén 门", "qiáng 墙", "dì bǎn 地板", "tiān huā bǎn 天花板"]
    },

    "花园": {
        icon: "🌺",
        title: "《美丽花园》",
        core: ["yuán dīng 园丁", "huā duǒ 花朵", "cǎo píng 草坪"],
        items: [
            "méi gui 玫瑰", "xiàng rì kuí 向日葵", "yù jīn xiāng 郁金香",
            "jiāo shuǐ hú 浇水壶", "chǎn zi 铲子", "mì fēng 蜜蜂",
            "hú dié 蝴蝶", "lán zi 篮子"
        ],
        environment: ["shù 树", "cǎo 草", "ní tǔ 泥土", "tiān kōng 天空", "tài yáng 太阳"]
    },

    "邮局": {
        icon: "📮",
        title: "《邮局一日》",
        core: ["yóu dì yuán 邮递员", "xìn jiàn 信件", "bāo guǒ 包裹"],
        items: [
            "yóu piào 邮票", "xìn fēng 信封", "míng xìn piàn 明信片",
            "bāo guǒ dān 包裹单", "chēng 秤", "yóu tǒng 邮筒",
            "bǐ 笔", "jiāo shuǐ 胶水"
        ],
        environment: ["guì tái 柜台", "yǐ zi 椅子", "chuāng hu 窗户", "mén 门", "qiáng 墙"]
    },

    "理发店": {
        icon: "💇",
        title: "《理发店》",
        core: ["lǐ fà shī 理发师", "yǐ zi 椅子", "jìng zi 镜子"],
        items: [
            "jiǎn dāo 剪刀", "shū zi 梳子", "chuī fēng jī 吹风机",
            "xǐ fà shuǐ 洗发水", "máo jīn 毛巾", "wéi jīn 围巾",
            "pēn wù qì 喷雾器", "fā jiā 发夹"
        ],
        environment: ["guì zi 柜子", "dēng 灯", "chuāng hu 窗户", "mén 门", "dì bǎn 地板"]
    },

    "客厅": {
        icon: "🛋️",
        title: "《温馨客厅》",
        core: ["shā fā 沙发", "diàn shì 电视", "chá jī 茶几"],
        items: [
            "yáo kòng qì 遥控器", "kào diàn 靠垫", "tái dēng 台灯",
            "huā píng 花瓶", "shū 书", "bēi zi 杯子",
            "dì tǎn 地毯", "guà zhōng 挂钟"
        ],
        environment: ["chuāng hu 窗户", "mén 门", "qiáng 墙", "dì bǎn 地板", "tiān huā bǎn 天花板"]
    },

    "四季": {
        icon: "🍂",
        title: "《四季变化》",
        core: ["chūn tiān 春天", "xià tiān 夏天", "qiū tiān 秋天", "dōng tiān 冬天"],
        items: [
            "huā 花", "shù yè 树叶", "xuě 雪", "tài yáng 太阳",
            "yǔ 雨", "fēng 风", "yún 云", "cǎi hóng 彩虹"
        ],
        environment: ["tiān kōng 天空", "shù 树", "cǎo 草", "shān 山", "hé liú 河流"]
    },

    "节日": {
        icon: "🎊",
        title: "《欢乐节日》",
        core: ["chūn jié 春节", "zhōng qiū jié 中秋节", "duān wǔ jié 端午节"],
        items: [
            "dēng lóng 灯笼", "hóng bāo 红包", "yuè bǐng 月饼",
            "zòng zi 粽子", "yān huā 烟花", "lǐ wù 礼物",
            "dàn gāo 蛋糕", "qì qiú 气球"
        ],
        environment: ["jiā 家", "jiē dào 街道", "guǎng chǎng 广场", "tiān kōng 天空", "zhuāng shì 装饰"]
    },

    "通用": {
        icon: "📝",
        title: "《识字小报》",
        core: ["rén 人", "wù pǐn 物品", "dì fang 地方"],
        items: [
            "dōng xi 东西", "gōng jù 工具", "shè bèi 设备",
            "yòng pǐn 用品", "cái liào 材料"
        ],
        environment: ["huán jìng 环境", "bèi jǐng 背景", "zhuāng shì 装饰", "kōng jiān 空间"]
    }
};

/**
 * 根据主题获取相关词汇
 * @param {string} theme - 主题名称
 * @returns {object} 词汇对象，包含 icon, title, core, items, environment
 */
function getVocabulary(theme) {
    // 精确匹配
    if (vocabularyDatabase[theme]) {
        return vocabularyDatabase[theme];
    }

    // 模糊匹配：主题包含词条（至少 2 个字），避免单字误匹配
    for (let key in vocabularyDatabase) {
        if (key !== "通用" && theme.includes(key) && key.length >= 2) {
            return vocabularyDatabase[key];
        }
    }

    // 默认返回通用词汇
    return vocabularyDatabase["通用"];
}

/**
 * 获取所有可用的主题列表
 * @returns {array} 主题名称数组
 */
function getAvailableThemes() {
    return Object.keys(vocabularyDatabase).filter(theme => theme !== "通用");
}

/**
 * 获取主题的建议标题
 * @param {string} theme - 主题名称
 * @returns {string} 建议的标题
 */
function getSuggestedTitle(theme) {
    const vocabulary = getVocabulary(theme);
    return vocabulary.title || `《${theme}》`;
}
