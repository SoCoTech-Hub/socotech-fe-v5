export const getTimeDifferenceFromPostDate = (dateCreated) => {
    let currentDate = new Date()
    let createdDate = new Date(`${dateCreated}`)
    let differenceInSeconds = Math.round((currentDate.getTime() - createdDate.getTime()) / 1000)
    let timeAgo = ""

    switch (true) {
        case (differenceInSeconds < 60):
            timeAgo = 'Posted less than a min ago'
            break;
        case (differenceInSeconds >= 60 && differenceInSeconds < 120):
            differenceInSeconds = Math.floor(differenceInSeconds /= 60)
            timeAgo = `Posted ${differenceInSeconds} min ago`
            break;
        case (differenceInSeconds >= 120 && differenceInSeconds < 3600):
            differenceInSeconds = Math.floor(differenceInSeconds /= 60)
            timeAgo = `Posted ${differenceInSeconds} mins ago`
            break;
        case (differenceInSeconds >= 3600 && differenceInSeconds < 7200):
            differenceInSeconds = Math.floor(differenceInSeconds /= 3600)
            timeAgo = `Posted ${differenceInSeconds} hour ago`
            break;
        case (differenceInSeconds >= 7200 && differenceInSeconds < 86400):
            differenceInSeconds = Math.floor(differenceInSeconds /= 3600)
            timeAgo = `Posted ${differenceInSeconds} hours ago`
            break;
        case (differenceInSeconds >= 86400 && differenceInSeconds < 172800):
            timeAgo = `Posted Yesterday`
            break;
        default:
            timeAgo = `${createdDate.toUTCString().slice(0, 16)}`;
    }
    return timeAgo
}