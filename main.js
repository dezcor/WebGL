(function() {
	// EScena,Camara,Render
	//
	let scene = new THREE.Scene();

	const aspectRatio = window.innerWidth/window.innerHeight;

	let camara = new THREE.PerspectiveCamera(75,aspectRatio,0.1,300);

	camara.position.z = 60;
	camara.position.y = 2;

	let planeGeometry = new THREE.PlaneGeometry(200,400);
	planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	let groupdMaterial = new THREE.MeshPhongMaterial({
		color: 0x222222
	});

	let plane = new THREE.Mesh(planeGeometry,groupdMaterial);

	plane.receiveShadow = true;


	let renderer = new THREE.WebGLRenderer();

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.soft = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;

	renderer.setSize(window.innerWidth,window.innerHeight);

	document.body.appendChild(renderer.domElement);

	let geometry = new THREE.BoxGeometry(10,10,10);



	let mesh = new THREE.Mesh(geometry,groupdMaterial);

	let pointLight = new THREE.PointLight(0xdfebff);


	pointLight.position.y  = 60;
	pointLight.position.z  = 20;

	pointLight.castShadow = true;

	//scene.add(mesh);
	scene.background = new THREE.Color(0xeeeeee);
	scene.add(new THREE.AmbientLight(0x404040));
	scene.add(pointLight);
	scene.add(plane);

	let loader = new THREE.TextureLoader();

	loader.load('world.png', (texture) =>{
		let geometry = new THREE.SphereGeometry(20,50,50);
		let material = new THREE.MeshBasicMaterial({
			map:texture
		});

		mesh = new THREE.Mesh(geometry,material);

		mesh.position.y = 25;

		mesh.castShadow = true;

		scene.add(mesh);
	})

	let control = new THREE.OrbitControls(camara,renderer.domElement);


	function loop(){
		requestAnimationFrame(loop);
		mesh.rotation.y += 0.01;
		//mesh.rotation.z += 0.01;
		renderer.render(scene,camara);

	}
	loop();
	
})();