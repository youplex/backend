/**
 * 
 * @module utils/youtube
 * 
 */

/**
 * 
 * @param {Object} data response item returned by youtube api 
 * @returns {Object} required data for creating a playlist doc
 */
export const getDataFromPlaylist = (data) => {
    const { id: playlistId, contentDetails: { itemCount: totalVideos } = {} } = data;
    const { title, description } = data.snippet;
    const { url: thumbnail } = data.snippet.thumbnails.high;
    
    return { title, description, playlistId, totalVideos, thumbnail };
}

/**
 * 
 * @param {Array} data response item returned by youtube api 
 * @returns {Array} required data for creating a video doc
 */
// for private videos thumnail is empty object
const placeholderImage = 'https://via.placeholder.com/480x360.png?text=Private+Video';
export const getDataFromVideos = (data, common={}) => {
    return data.map((item) => {
        const { title, description, position: order } = item.snippet;
        const { url: thumbnail = placeholderImage } = item.snippet.thumbnails?.high || {};
        const { videoId } =  item.snippet.resourceId;

        return {title, description, order, thumbnail, videoId, ...common };
    })
}

