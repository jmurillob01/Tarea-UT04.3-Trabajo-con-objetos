"use strict";

import VideoSystem from "./VideoSystemModel.js";
import VideoSystemView from "./VideoSystemView.js";
import VideoSystemController from "./VideoSystemController.js";

let VideoSystemApp;


(function() {
	VideoSystemApp = new VideoSystemController(
		VideoSystem.getInstance(), new VideoSystemView()
	);
})();

export default VideoSystemApp;
