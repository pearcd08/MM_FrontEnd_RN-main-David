// Created by Anna McColl 14-05-23
// Model for Counsellor objects sent from back end.

class ForumPost{

    // constructor for already created forum posts.
    constructor(id,
        title,
        postType,
        postContent,
        createdOn,
        eventDateTime,
        authorID,
        postContentCategory,
    ) {
    this.id = id;
    this.title = title;
    this.postType = postType;
    this.postContent = postContent;
    this.createdOn = createdOn;
    this.eventDateTime = eventDateTime;
    this.authorID = authorID;
    this.postContentCategory = postContentCategory;
    }    
}

export default ForumPost;
