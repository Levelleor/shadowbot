const LABYRINTH = [
  [ //0 column
    { // 0 0
      directions: ["south", "east"], 
      isEnd: false, 
      description: "", 
      events: {
          complete: false,
          name: "Look around",
          result: ``
        }
    }, 
    { // 0 1

    }
  ], [ //1 column
    { // 1 0

    },
    { // 1 1

    },
    { // 1 2

    },
    { // 1 3

    }, 
    { // 1 4
      
    },
    { // 1 5

    }, 
    { // 1 6

    }, 
    { // 1 7

    }
  ], [ //2 column
    { // 2 0

    },
    { // 2 1

    },
    { // 2 2

    },
    { // 2 3

    }, 
    { // 2 4
      
    },
    { // 2 5

    }, 
    { // 2 6

    }, 
    { // 2 7

    }
  ], [ //3 column
    { // 3 0

    },
    { // 3 1

    },
    { // 3 2

    },
    { // 3 3

    }, 
    { // 3 4
      
    },
    { // 3 5

    }, 
    { // 3 6

    }, 
    { // 3 7

    }
  ], [ //4 column
    { // 4 0

    },
    { // 4 1

    },
    { // 4 2

    },
    { // 4 3

    }, 
    { // 4 4
      
    },
    { // 4 5

    }, 
    { // 4 6

    }, 
    { // 4 7

    }
  ], [ //5 column
    { // 5 0

    },
    { // 5 1
      directions: [
        {
          name: "west"
        },
        {
          name: "east",
        },
        {
          name: "south",
        }
      ],
      isEnd: false, 
      description: "The smell instantly absorbed your mind. The water still comes from somewhere regularly in this part of the sewers. Even though there are pools with stale water it doesn't seem to be as old and green. There is also some light coming from the above.", 
      img: 'maze_5_1.jpg',
      lookaround: {
        result: `It is impossible to tell the source of light. But it is possible to find where the water is coming from. The could be the exit of sewers to the east, where the source of this water stream.`
      }
    },
    { // 5 2
      directions: [
        {
          name: "west"
        },
        {
          name: "south",
        }
      ],
      isEnd: false, 
      description: "This part of sewers is pretty bright. Except for one dark part in front of you. The shadow of the wall hid the bodies of the silhouettes but their bright eyes attentively watch your every step.", 
      img: 'maze_5_1.jpg',
      lookaround: {
        result: `The shadows don't seem to be able to leave their dark part of sewers, or they have no means... yet. There is a south turn few steps before them where you could slip right by them to the rest of sewers.`
      }
    },
    { // 5 3
      directions: [
        {
          name: "south",
          locked: "action",
          requires: ["Used lamp /5-3"]
        }
      ],
      isEnd: false, 
      description: "You've entered next room expecting more civilization but this place appeared to be dark and forgotten. Though, someone still remembers it, and he is still here, stands on the top of the waterfall, the source of all that water, and watches your every move. Finally it looks like shadow is moving closer.", 
      img: 'maze_5_3.jpg',
      lookaround: {
        result: `The shadow does not take eyes off you. You continue watching what will happen. Nothing. Shadow literally does not move at all. But you cannot stop looking at it. Your sight is locked on shadow... Scary thought filled your mind, finally you thought that you might die just standing like this forever...`
      },
      //It teleported down the waterfall and now is standing right in front of you... Watching...
      uses: [
        {
          item: "lamp",
          result: "You finally collect all your will and break the shadow grip. The only weapon you have, it's in your hand. You throw the lantern directly in the shadow. It breaks, the fire spreads around it. Shadow, it's burning, it can't handle this light. When shadow melted in light you finally felt released. You examined the place where shadow dissapeared and found some dark essense. The essense started moving in your direction. Finally it touched you and got absorbed with your body. You don't feel any different but scared of what that might do to you in future.", 
          rewardType: "action",
          reward: "Used lamp /7-3",
          locked: "action",
          requires: ["Interact with shadow /5-3"]
        }
      ]
    }, 
    { // 5 4
      
    },
    { // 5 5

    }, 
    { // 5 6

    }, 
    { // 5 7

    }
  ], [ //6 column
    { // 6 0
      directions: [
        {
          name: "east"
        },
        {
          name: "south",
        }
      ],
      isEnd: false, 
      description: "Another tunnel. As dark as all the previous. Except this one does not look like it's a part of a building you were in. It doesn't even look like it was made by people, more like some giant worm went right through the rock.", 
      img: 'maze_6_0.jpg',
      lookaround: {
        result: ` - "Weird stone statues stand close the walls and watch your every move. You also felt some movement near one of them. Approached it you realized it's not the statue, the PLANT! IT'S MOVING! All the plants in this cave, they are alive and few of them are now spreading their tentacles in your direction.`
      }
    },
    { // 6 1
      directions: [
        {
          name: "north"
        },
        {
          name: "west",
        }
      ],
      isEnd: false, 
      description: "Unlike all the previous tunnels this one has some light. And unlike all normal tunnels that you've seen before the light comes from the plant, specifically from the red mushrooms all around this part of the cave.", 
      img: 'maze_6_1.jpg',
      lookaround: {
        result: `Far ahead seems to be some weak light and the moisture from before. Seems like the stale water source is still ahead.`
      }
    },
    { // 6 2
      directions: [
        {
          name: "north"
        },
        {
          name: "east",
        },
        {
          name: "south",
        }
      ],
      isEnd: false,
      description: "You can hear the purling water from here since sewers are downstairs. The south part of the room enters the dungeon while the east seems to lead upstairs.", 
      img: 'maze_6_2.jpg',
      lookaround: {
        result: `Stale water downstairs indicates that this is the entrance to the sewers. The water seems to come out from under the upstares at the east part of the room. You can hear purling water under the stairs, the source must be upstairs.`
      }
    },
    { // 6 3
      directions: [
        {
          name: "west"
        },
        {
          name: "north",
        }
      ],
      isEnd: false,
      description: "Plants grow in here, which should be a good sign. Though light comes from very far up, you can't even approximately determine how far underground you are. There are also some small sewers waterfalls here.", 
      img: 'maze_6_3.jpg',
      lookaround: {
        result: `This place looks civilized. The water looks clean, the source should be very close. Plants grow here, so the light source should be strong enough to keep them alive.`
      }
    }, 
    { // 6 4
      directions: [
        {
          name: "south",
          locked: "equipment",
          requires: ["compass", "lamp"]
        }
      ],
      isEnd: false, 
      description: `You got magically teleported to a strange location. You can't see anything except wardrobes. They are everywhere and it seems like they form some kind of a path. Multiple pathes.\n - "It's a labytinth", - reacted your frightened mind.`, 
      img: 'maze_6_4.jpg',
      lookaround: {
        result: `You look around. You found out that you have nothing left except your clothes. On the ground you found a lamp. It surrounds you with its soft light. You can see the walls around you. Next to it there is a compass. You can use it to track which direction you're moving. \n "What a convenient loot in a creepy dungeon", - you thought.`,
        action: function(player) {
          player.addeq(["compass", "lamp"]);
        }
      }
    },
    { // 6 5
      
    }, 
    { // 6 6

    }, 
    { // 6 7

    }
  ], [ //7 column
    { // 7 0
      directions: [
        {
          name: "north"
        },
        {
          name: "east",
        }
      ],
      isEnd: false, 
      description: "The tunnels end here. Just a completely dark cave consumed you in its tight embrace. You can see the tunnel to the east and a hole in a wall that leads somewhere deeper into caves.", 
      img: 'maze_7_0.jpg',
      lookaround: {
        result: ` - "There should be another way", - you thought hopelessly.\nAfter quite some time of walking through the place, you couldn't find a path except already discovered two.`
      }
    },
    { // 7 1
      directions: [
        {
          name: "west"
        },
        {
          name: "east",
        }
      ],
      isEnd: false, 
      description: "Long and dark tunnel. Water on the sides in rows is stale. You feel the pressure of the ground around you. You're very Very low underground. The fact that there was light on this level only makes it even scarier.", 
      img: 'maze_7_1.jpg',
      lookaround: {
        result: `Enormous webs decorate this place.\n - "How many spiders should live here to make this many of them?"\nWater in the rows on the sides of the tunnel is old and stale. It took almost poison green shade through the ages it stayed here.`
      }
    },
    { // 7 2
      directions: [
        {
          name: "west"
        },
        {
          name: "north",
        },
        {
          name: "east",
        }
      ],
      isEnd: false, 
      description: "You've entered catacombs. At least that what it looks like. There are still chains and naked walls everywhere with that disgusting underground moisture all around you. It looks like some light is coming from the ceiling, exit might be close.", 
      img: 'maze_7_2.jpg',
      lookaround: {
        result: `You tried to understand where the light is coming from but it is too weak to determine it's location and source. Chains also do not have any purpose as you tried to pull every single one of them with no results. You feel that the north part of the path has a higher humidity.`,
      },
      scare: {
        name: "7_2_0",
        img: "scare_7_2.jpg",
        text: "I\'m waiting for you..."
      }
    }, 
    { // 7 3
      directions: [
        {
          name: "west",
          locked: "action",
          requires: ["Used lamp /7-3"]
        },
        {
          name: "east",
        }
      ],
      isEnd: false, 
      description: "After walking for quite some time through the long tunnel you finally see some weak green light ahead. You speed up, there is finally something you could possibly do to escape this place. Those torturing devices were bringing all the types of thoughts so you decide that there, probably, won't be anything worse than that.", 
      img: 'maze_7_3.jpg',
      lookaround: {
        result: `The light of your lamp does not reach the walls of the room so you start walking across it trying to understand where you at. It was better not to. This place is literally filled with torturing devices. You even thought that you saw some fresh flesh in one of them. While you were already imagining how you will die in one of them you, with an edge on an eye, saw the door reacted with a green light. You decided that you could try to open this door somehow. The door looks pretty simple, but the lock... There is no hole for a key in it, though the crystal seems to react with a green light to something. On the crystal there is a picture of some kind of a torch, as far as you can tell...`,
      },
      uses: [
        {
          item: "lamp",
          result: "It looks like the lock reacts on lamps light. The closer the lamp the brighter it gets. You start moving lamp closer to the door until it touches the locking mechanism. The lock backfired with own light of green which painted the whole room with its relaxing shades. All of the sudden all the light in the room disappeared, your lamp died too but the door clicked and started opening. When the process ended your lamp abruptly lit up again and the new path appeared.", 
          rewardType: "action",
          reward: "Used lamp /7-3"
        }
      ]
    }, 
    { // 7 4
      directions: [
        {
          name: "west",
        },
        {
          name: "north",
        }
      ],
      isEnd: false, 
      description: "You started moving through the dungeon. The scary walls, chains, and weird devices are pushing you from all sides. The smell... It's the smell of absence of people.\n - \"No one was here for ages!\", - you though. \nAfter some time walking you start feeling like the dungeon tries to speak to you. It whispers, tries to tell you something. Maybe it wants to help! Or you just went crazy too soon.",
      img: 'maze_7_4.jpg',
      lookaround: {
        result: `You tried to find something useful around but... there is literally nothing. Few chains that were used for torture ages ago are still qualitatively attached to the walls. You have come to the conclusion that the only thing you can collect here is spider web, and who knows if you will survive even that challenge.`,
      }
    },
    { // 7 5

    }, 
    { // 7 6

    }, 
    { // 7 7

    }
  ]
];

module.exports = LABYRINTH;