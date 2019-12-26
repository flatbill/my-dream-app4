export class MyAgmMarker {
  lat: number;
  lng: number;
  label?: string;  //question mark means optional when instantiating.
  draggable: boolean;
  iconUrl: object;     // bill added these properties to the vanilla agm marker layout
  locationId: string;  // where the example had it in the .ts as an 'interface'
  title: string;       // not a class.
  urlLink1: string;    // interfaces blow my mind, so I made this a class.
  urlLink2: string;
}