const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

export default class Lyric {
	/**
	 * 构造函数
	 * @param {*} lrc 歌词原始字符串
	 * @param {*} handler 抵达时间戳回调函数
	 */
	constructor(lrc, handler = () => {}) {
		this.lrc = lrc;
		this.lines = [];
		this.handler = handler;
		this.state = STATE_PAUSE;
		this.curLineIndex = 0; // 当前播放歌词所在函数
		this.startStamp = 0; // 歌曲开始时的时间戳

		this._initLines();
	}

	_initLines() {
		const lines = this.lrc.split('\n');
		for (let i = 0; i < lines.length; i += 1) {
			const line = lines[i];
			let result = timeExp.exec(line); // 匹配出时间[00:01.222]
			if (!result) {
				continue;
			}
			const txt = line.replace(timeExp, '').trim(); // 得到歌词文本
			if (txt) {
				if (result[3].length === 3) {
					result[3] = result[3] / 10;
				}
				this.lines.push({
					time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
					txt
				});
			}
		}
		this.lines.sort((a, b) => {
			return a.time - b.time;
		});
	}

	/**
	 * 开始播放
	 * @param {*} offset 时间进度
	 * @param {*} isSeek 标志位，用户是否手工调整进度
	 */
	play(offset = 0, isSeek = false) {
		if (!this.lines.length) {
			return;
		}
		this.state = STATE_PLAYING;
		// 找到当前行
		this.curLineIndex = this._findCurLineIndex(offset);
		this._callHandler(this.curLineIndex - 1);
		this.startStamp = +new Date() - offset;
		if (this.curLineIndex < this.lines.length) {
			clearTimeout(this.timer);
			this._playReset(isSeek);
		}
	}

	_findCurLineIndex(time) {
		for (let i = 0; i < this.lines.length; i += 1) {
			if (time <= this.lines[i].time) {
				return i;
			}
		}
		return this.lines.length - 1;
	}

	_callHandler(i) {
		if (i < 0) {
			return;
		}
		this.handler({
			txt: this.lines[i].txt,
			lineNum: i
		});
	}

	// 继续播放
	_playReset(isSeek = false) {
		let line = this.lines[this.curLineIndex];
		let delay;
		if (isSeek) {
			delay = line.time - (+new Date() - this.startStamp);
		} else {
			let preTime = this.lines[this.curLineIndex - 1]
				? this.lines[this.curLineIndex - 1].time
				: 0;
		}
		this.timer = setTimeout(() => {
			this._callHandler(this.curLineIndex++);
			if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
				this._playRest();
			}
		}, delay);
	}

	togglePlay(offset) {
		if (this.state === STATE_PLAYING) {
			this.stop();
		} else {
			this.state = STATE_PLAYING;
			this.play(offset, true);
		}
	}

	stop() {
		this.state = STATE_PAUSE;
		clearTimeout(this.timer);
	}

	seek(offset) {
		this.play(offset, true);
	}
}
