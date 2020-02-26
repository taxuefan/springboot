/**
 * @author chu
 * @constructor pubDao
 * @description cli命令的通讯类主要调用jaxa来，返回各种网络设备的数据123123
 * @since version 1.0
 */

define(function(require, exports, module) {

	var handler = require("util.handler");
	var pubDao = new (require("dao.pubDao"));
    var verDao = new (require("dao.verDao"));	
	require('message.pub');
	require('util.pub');
	require('rui');
	var ApLogin = {
		mainPage : "../../main.htm",
		mobileMainPage : "../../ap-mobile/main.htm",
		// 要调用的资源文件
		init : function(cb) {
			this.initLoader();
			this.setWebChatUrl();
			cb();
		},
		doAfterLogin : function(param){
			var self = this;
			self.devType = top.PROD.webProdDir;
		    // 版本兼容问题的处理,判断是否smartweb，如果是，就需要调用版本问题。否则不需要。还需要提供等待功能
			if (self.devType == "ap" || self.devType == "ac"){
				var isOldVersion = verDao.isOldVersion();
				//且是否还没备份过
				var isOld = verDao.isXml("/data/.rgos/vsd/0/oam/web/xml");
				var isNew  = verDao.isXml("/data/.rgos/vsd/0/oam/web/");
				if (isOldVersion &&　isOld　&&　!isNew) {
					ApLogin.initLoader();
					ApLogin.loader.loadStart();
					ApLogin.compaVersion();
				}
			}
		  //判断用户名和密码是否默认为 。gueset已经不是默认用户
			var mainUrl = self.mainPage;
			var mobileMainUrl = self.mobileMainPage;
			if (param.userNameValue == "admin" && param.passwordValue == "admin") {
				 $.cookie("HOME_ALERT", parseInt(100000 * Math.random()) );		
			}
			//判断手机端
			if(Pub.isMobileDev()){			     
				window.open(mobileMainUrl, "_top");
				
			} else {
			// 当设备是ap设备，判断模式
				if (self.devType == "ap") {
					var apMode = pubDao.getApmode();
					if (apMode == "fit") {
		        		//支持l2tp的ap
						 if (pubDao.getL2tpTag()) {
								window.open(mainUrl, "_top");
							} else {
								window.open("/ap/system/sys-mode.htm", "_top");
							}
	
						} else {
							window.open(mainUrl, "_top");
						}
				} else {
							window.open(mainUrl, "_top");
			   }
			}
		},
		/* 版本兼容处理，获取各个文件，并进行上传处理 */
		compaVersion : function() {
			var self = this;
			// 增强功能的兼容 拷贝xml
			var isFile = verDao.isXml("/data/.rgos/vsd/0/oam/web/xml");
			if (isFile) {
				verDao.copyXml("websys-info.xml");
			}
			// 用户管理员兼容 整理json,整理出映射表

			// 无线管理的兼容 上传文件json用json处理上传
			if (self.devType == "ac") {
				verDao.upLoadJson();
			}
			// 删除xml目录,暂时不删除，因为不知道何时完全没有用
			var isXml = verDao.isXml("/data/.rgos/vsd/0/oam/web");
			if (isXml) {
				// verDao.delXml();
			}
		},
		/* 等待加载 */
		initLoader : function() {
			var self = this;
			if (!self.loader) {
				self.loader = new rui.Loader({
							text : Resource["main.version.title"],
							loadStyle : "innerborder",
							duration : 120000,
							logoStyle : "no-loader-logo"
						});
			}
		},
		/**
		 * 获取网聊的url地址
		 */
		setWebChatUrl : function() {
		     pubDao.getVersionInfo(null,function(version){
		    var devType = pubDao.getProdSeries(), description, softwareVersion, enterurl, online;
			softwareVersion = version.softwareVersion;
			if (devType === "ap" || devType === "ac") {
				description = version.description.split(/\s+/g)[2];
				enterurl = encodeURIComponent("无线产品#" + description + "#"
						+ softwareVersion);
			} else if (pubDao.isEG()) {
				enterurl = encodeURIComponent("无线产品#MCFi#" + softwareVersion);
			} 
			online = "http://webchat.ruijie.com.cn/live800/chatClient/chatbox.jsp?companyID=8933&configID=4&enterurl="
					+ enterurl;
			$("#webchatUrl").attr("href", online);
			});
		}
	};
	module.exports = ApLogin;
});
