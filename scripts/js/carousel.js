window.addEventListener('DOMContentLoaded', () => {
	let slideIndex = 0

	carousel()

	function carousel() {
		let i
		let slides = document.getElementsByClassName('slide')
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none'
		}
		slideIndex++
		if (slideIndex > slides.length) {
			slideIndex = 1
		}
		slides[slideIndex - 1].style.display = 'block'
		setTimeout(carousel, 4500)
	}

	// web audio api related
	const audioContext = new AudioContext()
	// consolidated version
	/* const audioContext = new(window.AudioContext || window.webkitAudioContext)(); */
	// get the audio element
	const audioElement = document.querySelector('audio')
	/* sets the loop attribute dynamically by setting the loop property on the audio element. */
	audioElement.loop = true
	// pass it into the audio context
	// noinspection JSCheckFunctionSignatures
	const track = audioContext.createMediaElementSource(audioElement)

	const gainNode = audioContext.createGain()

	track.connect(gainNode).connect(audioContext.destination)

	// select the play button
	const playButton = document.querySelector('.play-pause')

	playButton.addEventListener(
		'click',
		function () {
			if (audioContext.state === 'suspended') {
				// noinspection JSIgnoredPromiseFromCall
				audioContext.resume()
			}
			// play or pause track
			if (this.dataset.playing === 'false') {
				audioElement.play()
				this.dataset.playing = 'true'
				playButton.innerHTML = 'Pause'
			} else if (this.dataset.playing === 'true') {
				audioElement.pause()
				this.dataset.playing = 'false'
				playButton.innerHTML = 'Play'
			}
		},
		false
	)
	audioElement.addEventListener('ended', () => {
		playButton.dataset.playing = 'false'
	})
	const volumeControl = document.querySelector('#volume')
	volumeControl.addEventListener(
		'input',
		function () {
			gainNode.gain.value = this.value
		},
		false
	)
})

window.addEventListener(
	'DOMContentLoaded',
	function () {
		const stage1 = document.getElementById('image-wrapper')
		const arr1 = stage1.getElementsByTagName('div')
		const stage2 = document.getElementById('image-wrapper')
		const arr2 = stage2.getElementsByTagName('img')
		const fadeComplete1 = function () {
			stage1.appendChild(arr1[0])
		}
		const fadeComplete2 = function () {
			stage2.appendChild(arr2[1])
		}

		for (let i = 0; i < arr1.length; i++) {
			arr2[i].addEventListener('animationend', fadeComplete1, false)
			for (let j = 0; j < arr2.length; j++) {
				arr2[j].addEventListener('animationend', fadeComplete2, false)
			}
		}
	},
	false
)
