"use strict";

import VideoSystem from "./VideoSystemModel.js";
import VideoSystemView from "./VideoSystemView.js";
import VideoSystemController from "./VideoSystemController.js";

let VideoSystemApp;


(function() {
	VideoSystemApp = new VideoSystemController(
		VideoSystem.getInstance(), new VideoSystemView()
	);

    const historyActions = {
        
		init: () => VideoSystemApp.handleInit(),
        ProductionsCategoryList: (event) => VideoSystemApp.handleProductionsCategoryList(event.state.categoryName),
        ProductionsCategoryListMenu: (event) => VideoSystemApp.handleProductionsCategoryList(event.state.categoryName),
        ProductionInformation: (event) =>VideoSystemApp.handleProductionInformation(event.state.productionTitle),
        PersonInformation: (event) =>VideoSystemApp.handleProductionPerson(event.state.personDNI, event.state.personRol),
        PersonNav: (event) => VideoSystemApp.handlePersonsNav(event.state.personRol),
        LoginNav: () => VideoSystemApp.handleShowLoginForm()
	}

	window.addEventListener('popstate', function(event) {
		if (event.state){
            console.log("popstate: " + event.state.action);
			historyActions[event.state.action](event);
		}
	});

	history.replaceState({action: 'init'}, null);
})();

export default VideoSystemApp;
