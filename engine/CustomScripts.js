class Script{
	constructor(script){
		this.run = script;
	}

	// return error text if things gone wrong
	run(statics, dynamics){};
}

class CustomScripts{
    constructor(){
        this.scripts = [];
    }
    add(name, script){
		this.scripts[name] = new Script(script);
    }
    delete(name){
        this.scripts.find()
    }
}
