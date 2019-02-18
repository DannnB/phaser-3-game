var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: 0,
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);
    var player;
    var enemy;
    var zombieDebug;
    var cursors;
    var textHealth;
    var textKills;
    var currentKills = 0;
    var currentHealth = 100;
    

    function preload () {
      // load in assets
      this.load.image('tarmac', 'assets/tarmac.png');
      this.load.image('lanes-4', 'assets/lanes-4.png');
      this.load.image('player', 'assets/player-sprite-emergency.png');
      this.load.image('zombie', 'assets/zombie_leader.png');
      // game.setBounds(100,100);
    }
    
    function create () {
      this.add.image(400, 300, 'tarmac');
      this.add.image(400, 300, 'lanes-4');

      // set text
      textHealth = this.add.text(10, 10, 'Health: 100', { font: '32px Courier', fill: '#ffffff' });
      textKills = this.add.text(10, 50, 'Kills: 0', { font: '32px Courier', fill: '#ffffff' });


      // set enemy locations
      zombieGroup = this.physics.add.group({
        key: 'zombie',
        frameQuantity: 7
      })

      // set up player
      
      player = this.physics.add.sprite(313, 530, 'player');
      player.setSize(67,37)
      player.setInteractive();

      this.anims.create({
        key: 'flash',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
        frameRate: 10
      })

      // debug enemy

      // zombieDebug = this.physics.add.image(20, 50, 'zombie');

      // on hitting a zombie

      this.physics.add.overlap(player, zombieGroup, killEnemy)
      
      // console.log('Bounds: ', game);
      player.setCollideWorldBounds(true);

      cursors = this.input.keyboard.createCursorKeys();

      let children = zombieGroup.getChildren();

      for (let i = 0; i < children.length; i++) {
        let x = Phaser.Math.Between(300, 500);
        let y = Phaser.Math.Between(10, 500);

        children[i]
          .setPosition(x, y)
          .body.setSize(20, 50, true);
        
        // this.physics.moveToObject(children[i], player, 200)
      }

      // zombieGroup.refresh();

      // for (let i = 0; i < children.length; i++) {
      //   children[i].body.physics.accelerateToObject(player);
      // }

      // accelerateTo(player, player.x, player.y, 20);
    }

    function killEnemy (player, enemy) {
      // zombieGroup.killAndHide(enemy);
      // enemy.body.enable = false;
      zombieGroup.remove(enemy, true, true);

      updateKills();
      updateHealth()
    }

    function updateKills () {
      currentKills = currentKills + 1;
      textKills.setText(`Kills: ${currentKills}`);
    }
    function updateHealth () {
      currentHealth = currentHealth - 20;
      textHealth.setText(`Health: ${currentHealth}`);
    }
    function resetGame() {

    }

    function update () {
      let children = zombieGroup.getChildren();

      player.setVelocity(0);

      // this.physics.moveToObject(zombieDebug, player, 140)

      // for (let i = 0; i < children.length; i++) {
      //   this.physics.moveToObject(children[i], player, 200)
      //   console.log('velocity', children[i].body.velocity.x);
      // }
      // this.physics.moveToObject(zombieDebug, player, 140)

      for (let i = 0; i < children.length; i++) {
        this.physics.moveToObject(children[i], player, 50)
      }
     
      
      if (currentHealth <= 0) {
        currentHealth = 100;
        currentKills = 0;
        this.scene.restart();
      }

      

      if (cursors.left.isDown) {
        player.body.setSize(62, 27);
        
        if(player.x > 298) {
          player.setVelocityX(-300);
          player.angle = -90;
        }        
      } else if (cursors.right.isDown) { 
        player.body.setSize(62, 27);
        
        if (player.x < 503) {
          player.setVelocityX(300);
          player.angle = 90;
        }
      } else if (cursors.down.isDown) {
        player.body.setSize(26, 63);

        player.setVelocityY(200);
        player.angle = 180;
      } else if (cursors.up.isDown) {
        player.body.setSize(26, 63);

        player.setVelocityY(-200);
        player.angle = 0;
      } else if (cursors.up.isDown && cursors.left.isDown) {
        player.setVelocityY(200);
        player.setVelocityX(-200);
        player.angle = 225;
      }
    }

    // function preload ()
    // {
    //   this.load.setBaseURL('http://labs.phaser.io');

    //   this.load.image('sky', 'assets/skies/space3.png');
    //   this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    //   this.load.image('red', 'assets/particles/red.png');
    // }

    // function create ()
    // {
    //     this.add.image(400, 300, 'sky');

    //     var particles = this.add.particles('red');

    //     var emitter = particles.createEmitter({
    //         speed: 100,
    //         scale: { start: 1, end: 0 },
    //         blendMode: 'ADD'
    //     });

    //     var logo = this.physics.add.image(400, 100, 'logo');

    //     logo.setVelocity(100, 200);
    //     logo.setBounce(1, 1);
    //     logo.setCollideWorldBounds(true);

    //     emitter.startFollow(logo);
    // }