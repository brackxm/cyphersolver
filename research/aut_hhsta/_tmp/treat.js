$(document).ready(function () {

	// I added everything to this function so I can get information I need after the page loads 
	all_functions();
})

function all_functions() {
	// var rootUrl = "https://test.treat.agency/onb_digital/"

	var result_item = []
	var searchItemTitle = ""
	var searchItemURL = ""
	var searchItemID = ""
	var thisCurrentSelectedID = "100378E6"
	var scene, controls;
	var camera;
	var renderer;
	var mouse = new THREE.Vector2(),
		INTERSECTED;
	var raycaster;
	var activeItems = []
	var thisLastHighlightedObjectID = ""
	var thisCurrentHighlightedObjectID = ""

	// sameh changes

	// trigger 
	$('body').on('click', '.show_3d', function () {

	})

	function setCookie(cname, cvalue) {
		document.cookie = cname + "=" + cvalue + ";path=/";
	}

	// search page
	$('#search_results_container').on('click', '.result_3d_btn', function () {
		// push to history to use later if user click on browser back button
		history.pushState("", "Search", window.location.href);

		document.getElementById('loading').style.display = 'flex';
		if ($(this).hasClass('show_3d')) {
			document.getElementById('loading').style.display = 'none';
		} else {
			$(".hide_on_3d").addClass('show_3d');
			thisCurrentSelectedID = $(this).attr('item_id');
			$("#content_background ").css('z-index', '0');
			setTimeout(function () {
				$("#threed").css('z-index', '0');
			}, 700);
			initScene();
		}
	})

	// detail page
	$('#icon_3d').click(function () {
		if ($(this).hasClass('show_3d')) {
			document.getElementById('loading').style.display = 'none';
		} else {
			$(".hide_on_3d").addClass('show_3d');
			thisCurrentSelectedID = $(this).attr('item_id');
			$("#content_background ").css('z-index', '0');
			setTimeout(function () {
				$("#threed").css('z-index', '0');
			}, 700);
			initScene();
		}
	})

	// closind the 3d part
	$('#nav_top , #search_logo_nav , #top_swipe,#quit_3d').click(function () {
		document.getElementById('loading').style.display = 'none';
		$("#content_background , #threed").css('z-index', '-1');
		$(".hide_on_3d").removeClass('show_3d');
		close3D();
		$(document).unbind( "mousemove" );
		setTimeout(function () {
			$("#threed canvas").remove();
			$(".hover_label").remove();
			removeOverLays();
			
			$(document).bind( "mousemove" );
		}, 1000);
		if ($("#top_swipe").hasClass('show_3d')) {
			history.back();
		}
	})
	
	// showing the tooltip 
	$('#reset_3d').mouseover(function () {
		$("#reset_tooltip").show();
		setTimeout(function() {
			$("#reset_tooltip").hide();
		}, 3000);
	})

	$('#reset_3d').mouseout(function () {
		$("#reset_tooltip").hide();
	})
	$('#quit_3d').mouseover(function () {
		$("#quit_tooltip").show();
		setTimeout(function() {
			$("#quit_tooltip").hide();
		}, 3000);
	})

	$('#quit_3d').mouseout(function () {
		$("#quit_tooltip").hide();
	})
	$('#help_3d').mouseover(function () {
		$("#help_tooltip").show();
		$("#help_tooltip").show();
		setTimeout(function() {
			$("#quit_tooltip").hide();
		}, 3000);
	})

	$('#help_3d').mouseout(function () {
		$("#help_tooltip").hide();
	})

	
	$('#reset_3d').click(function () {
		moveToFirstElement();
	})
	$('#help_3d').click(function () {
		$("#help_3d_layer").show();
	})

	$('#help_3d_layer_background , #help_3d_layer_inner_close').click(function () {
		$("#help_3d_layer").hide();
	})



	// close when u click back btn
	window.onpopstate = function (event) {
		// in case of 3d
		if ($("#top_swipe").hasClass('show_3d')) {
			document.getElementById('loading').style.display = 'none';
			$("#content_background , #threed").css('z-index', '-1');
			$(".hide_on_3d").removeClass('show_3d');
			setTimeout(function () {
				$("#threed canvas").remove();
			}, 1000);
			console.log("triggerd");

		}
	}

	// initScene();

	// end changes


	function api_query(id) {

		$.ajax({
			type: "POST",
			url: rootUrl + "Frontend/search_by_id",
			data: {
				'id': id,
			},
			success: function (data) {
				var json = $.parseJSON(data);

				// the query url
				var url = json["url"];
				var err = json["err"];
				result_item = json["result_item"];
				var connected_items = json["connected_items"];

				for (var connected_item in connected_items) {
					result_item[connected_item] = connected_items[connected_item];
				}

				delete result_item['externalId'];
				delete result_item['countries'];
				delete result_item['openUrl'];
				delete result_item['persons'];
				delete result_item['category'];
				delete result_item['signature'];
				delete result_item['subjects'];
				delete result_item['previewUrl'];
				delete result_item['yearOfPublication'];
				delete result_item['placeOfPublication'];
				delete result_item['__proto__'];
				delete result_item['publisher'];
				delete result_item['created'];
				delete result_item['department'];
				delete result_item['dipUrl'];
				delete result_item['highlight'];
				delete result_item['languages'];
				delete result_item['mediatype'];
				delete result_item['externalId'];
				delete result_item['barcode'];
				delete result_item['catalogUrl'];
				delete result_item['contentInformation'];
				delete result_item['lastModified'];
				delete result_item['imageAccessRestricted'];
				delete result_item['idnr'];

				searchItemID = valid_v(result_item['id']);
				searchItemTitle = valid_v(result_item['title']);
				searchItemURL = valid_v(result_item['thumbnailUrl']);

				var nr = 0
				/*
				for (var key in result_item) {
					if (result_item[key] instanceof Array) {
						
						$('#object_3d').append('<h1>${key} +</h1><ul id="array_${nr}"></ul>');
						var sub_key = result_item[key];
						nrr=0
						for (var key in sub_key) {

							$('#array_'+nr).append('<h2>${key} +-</h2><ul id="item_${nr}${nrr}"></ul>');		

							var subb_key = sub_key[key];
							for (var key in subb_key) {
								$('#item_'+nr+nrr).append('<h3>${key} - ${subb_key[key]}</h3><ul id="item_${nr}"></ul>');						
							}
					nrr++
						}
					}else{

						$('#object_3d').append('<h1>${key} - ${result_item[key]}</h1><ul id="item_${nr}"></ul>');
					
					}
					nr++;
				}
				*/

				addContent()

				function valid_v(value) {
					if (value != null && value != undefined) {
						return value
					} else {
						return 'empty';
					}
				}
			}

		});
	}

	var addAdACube = function (id, url, x, y, z, w, h, d, displayTitle) {
		//A CUBE

		var thisMetaObject = new Object();

		thisMetaObject.onbID = id
		thisMetaObject.currentlyHighlighted = false
		thisMetaObject.displayTitle = displayTitle

		var texture = new THREE.TextureLoader().load(url);
		var material = new THREE.MeshStandardMaterial({
			map: texture,
			roughness: 0,
			metalness: 0.1,
			color: 0xCCCCCC
		});
		var geometry = new THREE.BoxGeometry(w, h, 0.001);

		var cube = new THREE.Mesh(geometry, material);
		cube.name = activeItems.length
		cube.isInArray = true
		cube.position.y = y
		cube.position.z = z
		cube.position.x = x
		cube.castShadow = true;

		thisMetaObject.cube = cube
		thisMetaObject.isInForeGround = false;
		thisMetaObject.actualZ = z;

		activeItems.push(thisMetaObject)

		return cube;
	}

	function addALabel(labelText, x, y, z) {
		//A LABEL
		var loader = new THREE.FontLoader();
		loader.load(rootUrl + 'items/frontend/js/OpenSans_Bold.json', function (font) {
			var geometry = new THREE.TextGeometry(labelText, {
				font: font,
				size: 0.15,
				height: 0.0001,
				curveSegments: 12,
				bevelEnabled: false,
				bevelThickness: 0.5,
				bevelSize: 1,
				bevelOffset: 0,
				bevelSegments: 15
			});

			var texMaterial = new THREE.MeshStandardMaterial({
				color: 0x000000,
				roughness: 0.7,
				metalness: 0.1
			});
			var text = new THREE.Mesh(geometry, texMaterial);
			text.name = "Text"
			text.isInArray = false
			text.position.x = x;
			text.position.y = y;
			text.position.z = z;
			text.castShadow = true;
			text.receiveShadow = true;

			/*
			var edges = new THREE.EdgesGeometry(geometry);
			var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
				color: 0x000000
			}));
			line.position.x = x
			line.position.y = y
			line.position.z = z
			scene.add(line);
			*/

			scene.add(text)
		});
	}

	function highLightAnObject(id) {
		activeItems[id].currentlyHighlighted = true
		activeItems[id].cube.scale.set(1.1, 1.1, 1.1)

	}

	function dehighlightAll() {
		//removeOverLays()
		activeItems.forEach(function (element) {
			if (element.currentlyHighlighted) {
				element.cube.scale.set(1, 1, 1)
				element.currentlyHighlighted = false
			}

		})
	}

	function unClickAll() {
		removeOverLays()
		activeItems.forEach(function (element) {
			if (element.isInForeGround) {
				var thisZ = element.actualZ
				element.isInForeGround = false
				createjs.Tween.get(element.cube.position, {
					loop: false
				}).to({
					z: thisZ
				}, 1000, createjs.Ease.getPowInOut(2));
			}
		})
	}


	function lights() {
		//LIGHTS	
		var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 2.2 );
		scene.add( light );   
		scene.fog = new THREE.FogExp2( 0xefd1b5, 0.1 );

		var hemiLightHelper = new THREE.HemisphereLightHelper( light, 1 );
		//scene.add( hemiLightHelper );
		
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.09 );
		directionalLight.position.y = 5
		directionalLight.position.z = 100
		directionalLight.castShadow = true
		//scene.add( directionalLight );
		
		dirLightHeper = new THREE.DirectionalLightHelper( directionalLight, 10 );
		//scene.add(dirLightHeper)
		
		rectLight = new THREE.RectAreaLight( 0xfffffc, 20, 2, 0.4 );
		rectLight.position.set( 0, 0, 5 );
		//rectLight.rotation.x = 10;
		//scene.add( rectLight );
	
		var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.BackSide } ) );
		rectLightMesh.scale.x = rectLight.width;
		rectLightMesh.scale.y = rectLight.height;
		//rectLight.add( rectLightMesh );
	}

	function initScene() {
		//RENDERER
		renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true;


		// sameh changes 
		var threed_element = document.getElementById('threed');
		threed_element.appendChild(renderer.domElement);
		// end sameh changes 
		$('#fallback').remove();

		raycaster = new THREE.Raycaster();

		//SCENE SETUP
		scene = new THREE.Scene();
		
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		camera.position.z = 5;
		
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		
		//HELPERS
		var axeshelper = new THREE.AxesHelper();
		//scene.add(axeshelper);

		lights();

		//addALabel("Loading...", 0,0,0);

		document.addEventListener('mousemove', onDocumentMouseMove)
		mouse.x = 0
		mouse.y = 0

		document.addEventListener('click', onMouseClick)
		document.addEventListener('touchstart', onTouch)

		animate();
		api_query(thisCurrentSelectedID);
	}

	function addContent() {
		while(scene.children.length > 0){ 
			scene.remove(scene.children[0]);
		}
		remove3DLoading();
		lights();

		//NEW COORDINATE SYSTEM

		var steps = 1.2;
		var xCount = 0;
		var yCount = 1;
		var globalXCount = 2;
		var gloablYCount = 3;
		var xMultiplyer = 1.5;
		var yMultiplyer = 1.5;

		var k = 0;
		var thisCoreX = 1;
		var thisCoreY = 1;

		scene.add(addAdACube(searchItemID, searchItemURL, 0, 0, 0, 1.2, 1.2, 0.01, searchItemTitle));

		for (var key in result_item) {

			if (result_item[key] instanceof Array) {
				var sub_key = result_item[key];
				if (sub_key.length > 0) {
					//NEW CORE
					thisCoreX = globalXCount * xMultiplyer + (Math.random()*1 - 0.5);

					xCount++;
					if (xCount == 2) {
						//Reverse direction
						xMultiplyer = xMultiplyer * -1
					}
					if (xCount == 4) {
						xCount = 0;
						xMultiplyer = xMultiplyer * -1
						globalXCount = globalXCount + steps//+ Math.random()*steps;
					}

					//console.log("X " + thisCoreX)

					thisCoreY = gloablYCount * xMultiplyer + (Math.random()*1 - 0.5);

					yCount++;
					if (yCount == 2) {
						//Reverse direction
						yMultiplyer = yMultiplyer * -1
					}
					if (yCount == 4) {
						yCount = 0;
						yMultiplyer = yMultiplyer * -1
						gloablYCount = gloablYCount + steps//+ Math.random()*steps;
					}

					//console.log("Y " + thisCoreY)


					addALabel(key, thisCoreX, thisCoreY, 0.2)
					//console.log(sub_key)

					var k = 0;
					for (var key in sub_key) {
						var subb_key = sub_key[key];
						k++
						var maxDepth = 10
						var maxWidth = sub_key.length
						var thisX = thisCoreX + 0.5 + Math.random()*maxWidth - (maxWidth/2)
						var maxHeight = sub_key.length
						var thisY = thisCoreY + 0.5 +  Math.random()*maxHeight - (maxHeight/2)
						var thisDepth = 0.2 - ((Math.random()*maxDepth) + 1)
		
						scene.add(addAdACube(subb_key.id, subb_key.img, thisX, thisY, thisDepth, 1, 1, 0.01, subb_key.title))
					}
				}
			}
		}
		TweenAnimate();
	}

	function TweenAnimate() {
		activeItems.forEach(function(element){
			var thisStartX = element.cube.position.x
			var thisStartY = element.cube.position.y
			createjs.Tween.get(element.cube.position, {loop: true})
				.wait(Math.random()*5000)
				.to({x: thisStartX + 0.01, y: thisStartY + 0.01}, 1000, createjs.Ease.getPowInOut(2))
				.to({x: thisStartX, y: thisStartY}, 1000, createjs.Ease.getPowInOut(2));
		})	

		createjs.Ticker.addEventListener("tick", stage);
	}


	function onDocumentMouseMove( event ) {
		event.preventDefault();
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	}
	
	function onTouch(event) {
		mouse.x = ( event.touches[0].pageX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.touches[0].pageY / window.innerHeight ) * 2 + 1;
		onMouseClick("event")
	}
		
	function onMouseClick(event) {
		unClickAll();
		$('.hover_labell').remove();
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( scene.children );
		if ( intersects.length > 0 ) {
			if(intersects[0].object.isInArray)

			if (thisCurrentHighlightedObjectID == intersects[0].object.name) {
					openDetail(intersects[0].object.name)
				} else {
					thisCurrentHighlightedObjectID = intersects[0].object.name
				}
			moveToElement(intersects[0].object.name)
			displayTapTitle(intersects[0].object.name)
		}
	}

	function moveToFirstElement() {	
		moveToElement(0)
	}
	
	function close3D() {
		document.removeEventListener('mousemove', onDocumentMouseMove)
		document.removeEventListener('click', onMouseClick)
		document.removeEventListener('touchstart', onTouch)
	}
	
	function moveToElement(id) {
		var thisTargetX = activeItems[id].cube.position.x
		var thisTargetY = activeItems[id].cube.position.y
		var thisTargetZ = 2.5//activeItems[id].cube.position.z + 5
		
		controls.target = activeItems[id].cube.position
		activeItems[id].isInForeGround = true
		createjs.Tween.get(activeItems[id].cube.position, {loop: false}).to({z: 0.1}, 1000, createjs.Ease.getPowInOut(2));
		
		createjs.Tween.get(camera.position, {loop: false}).to({x: thisTargetX, y: thisTargetY, z: thisTargetZ}, 1000, createjs.Ease.getPowInOut(2)).call(updateControl);
		createjs.Tween.get(camera.rotation, {loop: false}).to({x: 0, y: 0, z: 0}, 1000, createjs.Ease.getPowInOut(2));

		
	}

	function updateControl() {
		controls.update();
	}

	var animate = function () {
		requestAnimationFrame( animate );
				render();

	};

	function render() {
		display = true
		// find intersections
		if (mouse.x != 0) {
			dehighlightAll()
			raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( scene.children );
		if ( intersects.length > 0 ) {
			
			if(intersects[0].object.isInArray)
					//console.log(intersects[0].object.name)		
					highLightAnObject(intersects[0].object.name)
				if (thisLastHighlightedObjectID != intersects[0].object.name) {
					thisLastHighlightedObjectID = intersects[0].object.name
					displayOverlay(thisLastHighlightedObjectID)
				}
			} else {
				removeOverLays()
			}
		} else {

		}

		renderer.render( scene, camera );
	}

	function displayOverlay(id) {
		var top = 0;
		var left = 0;
		onmousemove = function(e){
			$('.hover_label').remove();
			$('.hover_labell').remove();
			top = e.clientY;
			left = e.clientX;
			if (activeItems[id].displayTitle) {
				var hover_label = '<span class="hover_label" style="position: fixed;top: '+top - 26+'px;left: '+left+'px;text-align: center;padding: 2px 6px;background: rgba(0, 0, 0, 0.5);color: white;border-radius: 5px;"> '+activeItems[id].displayTitle+'</span>';
				$('body').append(hover_label);
			}
		}
	}

	function displayTapTitle(id) {
		$('.hover_labell').remove();
		setTimeout(function (){
			var hover_label = '<span class="hover_labell" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);text-align: center;padding: 2px 6px;background: rgba(0, 0, 0, 0.5);color: white;border-radius: 5px;"> '+activeItems[id].displayTitle+'</span>';
			$('body').append(hover_label);
		}, 600);
	}

	function openDetail(id) {
		window.location.assign(rootUrl+activeItems[id].onbID);
	}


	function removeOverLays() {
		$('.hover_label').remove();
	}

	function remove3DLoading() {
			document.getElementById('loading').style.display = 'none';
	}
	}