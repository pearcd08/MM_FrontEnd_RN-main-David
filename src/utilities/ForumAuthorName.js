// Created by Anna McColl 23-05-23
// To return the appropriate string to appear on a post or comment card, per user type.

function ForumAuthorName(authorUser){
    if (authorUser.firstName) {
        
        return authorUser.firstName + " " + authorUser.lastName + ", " + authorUser.businessName;
      } else {
        return authorUser.username;
}
}
export default ForumAuthorName;