class Album {
    label: Album.AlbumLabel;
}
module Album {
    export class AlbumLabel { }
}

var x = new Album();
var y = new Album.AlbumLabel();
