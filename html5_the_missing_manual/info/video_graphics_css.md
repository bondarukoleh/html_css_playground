#### Audio and Video
Before HTML5 there was < embed > < object > and flash player, which iOS isn't support at all.
< audio > element at its absolute simplest:
```html
<p>Hear us rock out with our new song,<cite>Death to Rubber Duckies</cite>:</p>
<audio src="rubberduckies.mp3" controls preload="metadata"></audio>
```
The src attribute provides the file name of the audio file you want to play. The controls attribute tells the browser
to include a basic set of playback controls.

```html
<video src="butterfly.mp4" controls width="400" height="300" poster="swiss_alps.jpg"></video>
```
The `mediagroup` attribute might be a useful tool if you need to synchronize concurrent video files.

##### Understanding the HTML5 Media Formats