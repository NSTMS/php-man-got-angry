import { GamePath, Tile } from '../types/gameTypes';

const bg_color: string = 'white';
const accent_color: string = 'beige';

const red_color: string = 'red';
const blue_color: string = 'blue';
const yellow_color: string = 'yellow';
const green_color: string = 'green';

const game_path = [44,45,46,47,48,37,26,15,4,5,6,17,28,39,50,51,52,53,54,65,76,75,74,73,72,83,94,105,116,114,103,92,81,70,69,68,67,66,55];

const modifyGamePath = (start: number): number[] => {
  const startIndex = game_path.indexOf(start);
  if (startIndex === -1) {
      throw new Error(`Start position ${start} not found in game path`);
  }
  return game_path.slice(startIndex).concat(game_path.slice(0, startIndex));
}

export const game_paths: Record<string,GamePath> = {
  "red":{
    base_points: [12,13,23,24],
    game_path:modifyGamePath(44),
    starting_point:44,
    ending_base_entry:55,
    ending_base_path:[56,57,58,59],
  },
  "blue":{
    base_points: [19,20,30,31],
    game_path:modifyGamePath(6),
    starting_point:6,
    ending_base_entry:5,
    ending_base_path:[16,27,38,49],
  },
  "green":{
    base_points: [89,90,100,101],
    game_path:modifyGamePath(76),
    starting_point:76,
    ending_base_entry:65,
    ending_base_path:[61,62,63,64],
  },
  "yellow":{
    base_points: [96,97,107,108],
    game_path:modifyGamePath(114),
    starting_point:114,
    ending_base_entry:115,
    ending_base_path:[104,93,82,71],
  }
}


export const gameboard: Tile[][] = [
  [
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
    },
    {
      background_color: accent_color,
      role: 'ending_point',
      type: 'tile',
    },
    {
      background_color: blue_color,
      role: 'starting_point',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
  ],
  [
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: red_color, role: 'starting_base', type: 'tile' },
    { background_color: red_color, role: 'starting_base', type: 'tile' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: blue_color, role: 'ending_base', type: 'tile' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: blue_color, role: 'starting_base', type: 'tile' },
    { background_color: blue_color, role: 'starting_base', type: 'tile' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
  ],
  [
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: red_color, role: 'starting_base', type: 'tile' },
    { background_color: red_color, role: 'starting_base', type: 'tile' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: blue_color, role: 'ending_base', type: 'tile' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: blue_color, role: 'starting_base', type: 'tile' },
    { background_color: blue_color, role: 'starting_base', type: 'tile' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
  ],
  [
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: blue_color, role: 'ending_base', type: 'tile' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
  ],
  [
    {
      background_color: red_color,
      role: 'starting_point',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: blue_color, role: 'ending_base', type: 'tile' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
  ],
  [
    {
      background_color: accent_color,
      role: 'ending_point',
      type: 'tile',
      
    },
    { background_color: red_color, role: 'ending_base', type: 'tile' },
    { background_color: red_color, role: 'ending_base', type: 'tile' },
    { background_color: red_color, role: 'ending_base', type: 'tile' },
    { background_color: red_color, role: 'ending_base', type: 'tile' },
    { background_color: bg_color, role: 'dice', type: 'blank' }, // środek układu
    { background_color: green_color, role: 'ending_base', type: 'tile' },
    { background_color: green_color, role: 'ending_base', type: 'tile' },
    { background_color: green_color, role: 'ending_base', type: 'tile' },
    { background_color: green_color, role: 'ending_base', type: 'tile' },
    {
      background_color: accent_color,
      role: 'ending_point',
      type: 'tile',
      
    },
  ],
  [
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: yellow_color, role: 'ending_base', type: 'tile' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    {
      background_color: green_color,
      role: 'starting_point',
      type: 'tile',
      
    },
  ],
  [
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: yellow_color, role: 'ending_base', type: 'tile' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
  ],
  [
    { background_color: bg_color, role: 'blank', type: 'blank' },
    {
      background_color: yellow_color,
      role: 'starting_base',
      type: 'tile',
      
    },
    {
      background_color: yellow_color,
      role: 'starting_base',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'tile' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: yellow_color, role: 'ending_base', type: 'tile' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'tile' },
    {
      background_color: green_color,
      role: 'starting_base',
      type: 'tile',
      
    },
    {
      background_color: green_color,
      role: 'starting_base',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'blank' },
  ],
  [
    { background_color: bg_color, role: 'blank', type: 'blank' },
    {
      background_color: yellow_color,
      role: 'starting_base',
      type: 'tile',
      
    },
    {
      background_color: yellow_color,
      role: 'starting_base',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: yellow_color, role: 'ending_base', type: 'tile' },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    {
      background_color: green_color,
      role: 'starting_base',
      type: 'tile',
      
    },
    {
      background_color: green_color,
      role: 'starting_base',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'blank' },
  ],
  [
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    {
      background_color: yellow_color,
      role: 'starting_point',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'ending_point',
      type: 'tile',
      
    },
    {
      background_color: accent_color,
      role: 'gameboard_tile',
      type: 'tile',
      
    },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
    { background_color: bg_color, role: 'blank', type: 'blank' },
  ],
];
