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
        ProductionsCategoryList: (event) => VideoSystemApp.handleProductionsCategoryList(event.state.categoryName)
        // Esto son las acciones que se añaden al objeto del historial
		// showShoppingCart: () => ShoppingCartApp.handleShowShoppingCart(),
		// productsCategoryList: (event) => ManagerApp.handleProductsCategoryList(event.state.category),
		// productsTypeList: (event) =>  ManagerApp.handleProductsTypeList(event.state.type),
		// showProduct: (event) => ManagerApp.handleShowProduct(event.state.serial)
	}

	window.addEventListener('popstate', function(event) {
		if (event.state){
            // Hay que arreglar en el init, si haces click en el logo, luego avanzas y retrocedes, da error
			historyActions[event.state.action](event);
		}
	});

	history.replaceState({action: 'init'}, null);
})();

export default VideoSystemApp;
