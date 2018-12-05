define(['jquery', 'ModuleClassLoader'], function($, ModuleClassLoader){
	var module = {}, extend = {};


		// SubModules

		// Module Styles
		extend.styles = {"default":{"global":{"css":"view.less"},"instance":{"css":"view.each.less"},"slug":"default"}};
		if (!extend.styles['default']['global']) {
			extend.styles['default']['global'] = {};
		}
		extend.styles['default']['global']['js'] = null;
		extend.defaultStyle = extend.styles['default'];

		// View JS
		module.oneLoaded = function audio_oneLoaded(){
	if (typeof window.top.dsnr != "undefined") {
		this.el.find(".seekable").width("50%");
		this.el.find(".current").width("50%");
		return;
	}
	var self = this;
	this.player = this.el.find(".jPlayer");
	require(['jquery.jplayer'], function(){
		$.jPlayer.timeFormat.padMin = false;
		self.player.jPlayer({
			supplied: "mp3",
			swfPath: webs.props.globalAssetBaseURL + '/static/global/js/jquery/plugins/jplayer2/Jplayer.swf',
			volume: 0.8,
			solution: "flash, html",
			ready: function jPlayer_ready(){
				var path = self.data.audio.webs.path,
					url;
				if(path.indexOf('/') == 0) path = path.substring(1);
				url = webs.site.url + path;
				self.player.jPlayer("setMedia", {"mp3": url});
				self.constructPlayer();
				if (self.data.autoplay) self.togglePlaying();
			},
		});

	});
};

module.constructPlayer = function audio_constructPlayer(){
	var self = this,
		seekable = self.el.find(".seekable"),
		current = self.el.find(".current"),
		played = self.el.find(".played"),
		total = self.el.find(".total"),
		remaining = self.el.find(".remaining");
	this.playing = false;
	this.el.find(".play-pause").click(function clickPlay(){
		self.togglePlaying();
	});
	function timeupdate(event){
		seekable.width((self.el.find(".progress-container").width() * event.jPlayer.status.seekPercent / 100 - (self.data.playerSize == "large" ? 6 : 0)) + "px");
		current.width(event.jPlayer.status.currentPercentRelative + "%");
		played.text($.jPlayer.convertTime(event.jPlayer.status.currentTime));
		total.text($.jPlayer.convertTime(event.jPlayer.status.duration));
		remaining.text("-" + $.jPlayer.convertTime(event.jPlayer.status.duration - event.jPlayer.status.currentTime))
	}
	this.player.bind($.jPlayer.event.timeupdate, timeupdate);
	this.player.bind($.jPlayer.event.progress, timeupdate);
	this.player.bind($.jPlayer.event.ended, function playEnded(event) {
		self.player.jPlayer("playHead", 0);
		self.playing = false;
		self.el.find(".play-pause").removeClass("playing");
	});
	seekable.click(function seekClick(event){
		self.player.jPlayer("playHead", event.offsetX / seekable.width() * 100);
	});
	this.player.bind($.jPlayer.event.play, function play(event){
		self.el.find(".play-pause").addClass("playing");
		self.playing = true;
	});
	this.player.bind($.jPlayer.event.pause, function pause(event){
		self.el.find(".play-pause").removeClass("playing");
		self.playing = false;
	});
	var muteToggle =this.el.find(".mute-toggle");
	self.muted = false;
	muteToggle.click(function toggleMute(){
		self.player.jPlayer(self.muted ? "unmute" : "mute");
		self.muted = !self.muted;
		muteToggle[self.muted ? "addClass" : "removeClass"]("muted");
	});
	this.el.find(".volume-bar-container").click(function changeVolume(event){
		var volume = (event.pageX - self.el.find(".volume-bar-container").offset().left) / self.el.find(".volume-bar-container").width();
		volume = Math.ceil(volume * 5) / 5;
		self.player.jPlayer("volume", volume);
	});
	this.player.bind($.jPlayer.event.volumechange, function volumeChanged(event){
		var volume = event.jPlayer.options.volume;
		for (i = 1; i <= 5; ++i)
		    self.el.find(".volume-" + i)[(i / 5 <= volume) ? "addClass" : "removeClass"]("active");
	});
};

module.togglePlaying = function audio_togglePlaying(){
    if (this.playing) {
	this.player.jPlayer("pause");
    } else {
	this.player.jPlayer("play");
    }
};


	ModuleClassLoader.register('audio', module, extend);
});