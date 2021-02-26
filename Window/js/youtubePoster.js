function getScreen( url )
{
    if(url === null){ return ""; }
    let vid;
    let results;

    url.replace("embed","watch");

    results = url.match("[\\?&]v=([^&#]*)");

    vid = ( results === null ) ? url : results[1];

    return "http://img.youtube.com/vi/"+vid+"/0.jpg";
}
