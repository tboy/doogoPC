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
    JSON.stringify(resultObj);
	var isPass = true;
	var arrs = resultObj.File.track;
	var duration = arrs[0].Duration;
	duration = parseInt(duration.substr(0, duration.indexOf("s")));
	//时长：6-15秒
	if (duration < 6 || duration > 15) {
		isPass = false;
	}






}
