var CHUNK_SIZE = 5 * 1024 * 1024;
var miLib, mi;
var processing = false;
var x2js = new X2JS();

//创建mediaInfo ，页面一打开就运行
//
miLib = MediaInfo(function() {
	console.debug('MediaInfo ready');

	window['miLib'] = miLib; // debug
	mi = new miLib.MediaInfo();

	// $videoFile.addEventListener('change', () => {
	// 	//判断input是否上传是否有变化，有变化则运行
	// 	const videoFile = document.querySelector('#videos').files[0];
	// 	parseFile(videoFile);
	// });
});

function parseFile(file) {
	//解析视频文件
	processing = true;
	var fileSize = file.size,
		offset = 0,
		state = 0,
		seekTo = -1,
		seek = null;
	mi.open_buffer_init(fileSize, offset);
	var processChunk = function(e) {
		var l;
		if (e.target.error === null) {
			var chunk = new Uint8Array(e.target.result);
			l = chunk.length;
			state = mi.open_buffer_continue(chunk, l);

			var seekTo = -1;
			var seekToLow = mi.open_buffer_continue_goto_get_lower();
			var seekToHigh = mi.open_buffer_continue_goto_get_upper();

			if (seekToLow == -1 && seekToHigh == -1) {
				seekTo = -1;
			} else if (seekToLow < 0) {
				seekTo = seekToLow + 4294967296 + (seekToHigh * 4294967296);
			} else {
				seekTo = seekToLow + (seekToHigh * 4294967296);
			}

			if (seekTo === -1) {
				offset += l;
			} else {
				offset = seekTo;
				mi.open_buffer_init(fileSize, seekTo);
			}
			chunk = null;
		} else {
			var msg = 'An error happened reading your file!';
			console.err(msg, e.target.error);
			alert(msg);
			return;
		}
		// bit 4 set means finalized
		if (state & 0x08) {
			var result = mi.inform();
			mi.close();
			addResult(file.name, result);
			return;
		}
		seek(l);
	};

	seek = function(length) {
		if (processing) {
			var r = new FileReader();
			var blob = file.slice(offset, length + offset);
			r.onload = processChunk;
			r.readAsArrayBuffer(blob);
		} else {
			mi.close();
		}
	};
	// start
	seek(CHUNK_SIZE);
}

function addResult(name, result) {
	//解析完成后复制到results
	var results = [];
	var resultObj = x2js.xml_str2json(result);
	results.unshift(resultObj);
    console.log(JSON.stringify(resultObj));
	var isPass = true;
	var arrs = resultObj.File.track;
	
	//时长：6-15秒
	var duration = arrs[0].Duration;
	duration = parseInt(duration.substr(0, duration.indexOf("s")));
	if (duration < 6 || duration > 15) {
		isPass = false;
	}

    //视频编码：H.264/AVC
    var videoFormat = arrs[1].Format;
	if(videoFormat == "AVC" || videoFormat == "H.264") {
		
	}else{
		isPass = false;
	}
	//格式类型：Main Profile

	
    //分辨率：640×360px
    if(parseInt(arrs[1].Width) ==640 && parseInt(arrs[1].Height) ==360) {
		
	}else{
		isPass = false;
	}
	
	//采样纵横比：1:1


    //文件大小：≤ 1.7MB
	if(parseInt(arrs[0].File_size) > (1024*1.7)) {
		isPass = false;
	}

    //视频码率：≤ 800 kbit/s
	if(parseInt(arrs[1].Bit_rate)>800){
		isPass = false;
	}

    //帧率推荐： 24 fps
	
    //音频格式：AAC
    if(arrs[2].Format != "AAC"){
		isPass = false;
	}
    //音频格式类型：LC
	if(arrs[2].Format_profile.indexOf("LC") ==-1){
		isPass = false;
	}

    //音频码率：≤ 96 kbit/sec
     if(parseInt(arrs[2].Bit_rate)>96){
		 isPass = false;
	 }
    //音频采样率推荐：44.1 kHz

    //Scan type：progressive

    //音画时差：< 0.5 秒

    //Standard：非PAL

    if(!isPass){
		alert("视频格式不正确！");
		app.$data.myTools[videoPos].src = '';
		$("#videos").val(null);
		$("#videos").val('');
	}

}
