const postSection = document.getElementsByClassName("posts")[0];

export function createPost(item) {
    const post = document.createElement("div");
    post.setAttribute('class', 'post');

    const postHeader = document.createElement("div");
    postHeader.setAttribute('class', 'postHeader');
    createPostHeader(postHeader, item);

    const postDescription = document.createElement("div");
    postDescription.setAttribute('class', 'postDescription');
    createPostDescription(postDescription, item);

    const postImages = document.createElement("div");
    postImages.setAttribute('class', 'postImages');
    createPostImages(postImages, item);

    const counts = document.createElement("div");
    counts.setAttribute('class', 'counts');
    createPostCounts(counts, item);

    const postFooter = document.createElement("div");
    postFooter.setAttribute('class', 'postFooter');
    createPostFooter(postFooter, item);

    const hr = document.createElement("hr");

    post.appendChild(postHeader);
    post.appendChild(postDescription);
    post.appendChild(postImages);
    post.appendChild(counts);
    post.appendChild(hr);
    post.appendChild(postFooter);

    postSection.appendChild(post);

    handleLeftAndRightButtons(post);
}

function createPostHeader(postHeader, item) {
    const postOwnerPic = document.createElement("img");
    Object.assign(postOwnerPic, {
        className: 'postOwnerPic',
        src: item.profilePic === '' ? './images/Default_pfp.jpg' : item.profilePic,
        alt: 'User Profile Picture'
    });
    
    const postInfo = document.createElement("div");
    postInfo.setAttribute('class', 'postInfo');

    const postOwnerName = document.createElement("span");
    postOwnerName.setAttribute('class', 'postOwnerName');
    postOwnerName.innerText = item.name;

    const postOwnerHighlights = document.createElement("span");
    postOwnerHighlights.setAttribute('class', 'postOwnerHighlights');
    postOwnerHighlights.innerText = item.highlights;

    const postCreatedDate = document.createElement("span");
    postCreatedDate.setAttribute('class', 'postCreatedDate');
    postCreatedDate.innerText = item.date;

    postInfo.appendChild(postOwnerName);
    postInfo.appendChild(postOwnerHighlights);
    postInfo.appendChild(postCreatedDate);

    postHeader.appendChild(postOwnerPic);
    postHeader.appendChild(postInfo);
}

function createPostDescription(postDescription, item) {
    postDescription.innerText = item.description;
}

function createPostImages(postImages, item) {
    item.images.forEach(img => {
        const postImg = document.createElement("img");
        Object.assign(postImg, {
            className: 'postImg',
            src: img,
            alt: 'Post Image'
        });
        postImages.appendChild(postImg);
    });
    const slideLeftButton = document.createElement("button");
    slideLeftButton.innerHTML = `&#10094`;
    slideLeftButton.setAttribute('class', 'slideLeftButton');
    
    const slideRightButton = document.createElement("button");
    slideRightButton.innerHTML = `&#10095`;
    slideRightButton.setAttribute('class', 'slideRightButton');

    postImages.appendChild(slideLeftButton);
    postImages.appendChild(slideRightButton);
}

function createPostCounts(counts, item) {
    const likeCount = document.createElement("span");
    likeCount.setAttribute('class', 'likeCount postCountSections');
    likeCount.innerText = item.likes + " likes";

    const commentCount = document.createElement("span");
    commentCount.setAttribute('class', 'commentCount postCountSections');
    commentCount.innerText = item.comments + " comments";

    counts.appendChild(likeCount);
    counts.appendChild(commentCount);
}

function createPostFooter(postFooter, item) {
    const like = document.createElement("span");
    like.setAttribute('class', 'like postFooterSections');
    const likeIcon = document.createElement("img");
    Object.assign(likeIcon, {
        className: "postIcons",
        src: "./images/like.png",
        alt: "Like Icon"
    });
    const likeText = document.createElement("span");
    likeText.innerText = 'Like';
    like.appendChild(likeIcon);
    like.appendChild(likeText);

    const comment = document.createElement("span");
    comment.setAttribute('class', 'comment postFooterSections');
    const commentIcon = document.createElement("img");
    Object.assign(commentIcon, {
        className: "postIcons",
        src: "./images/comment.png",
        alt: "Comment Icon"
    });
    const commentText = document.createElement("span");
    commentText.innerText = 'Comment';
    comment.appendChild(commentIcon);
    comment.appendChild(commentText);

    const repost = document.createElement("span");
    repost.setAttribute('class', 'repost postFooterSections');
    const repostIcon = document.createElement("img");
    Object.assign(repostIcon, {
        className: "postIcons",
        src: "./images/refresh.png",
        alt: "Repost Icon"
    });
    const repostText = document.createElement("span");
    repostText.innerText = 'Repost';
    repost.appendChild(repostIcon);
    repost.appendChild(repostText);

    const send = document.createElement("span");
    send.setAttribute('class', 'send postFooterSections');
    const sendIcon = document.createElement("img");
    Object.assign(sendIcon, {
        className: "postIcons",
        src: "./images/send.png",
        alt: "Send Icon"
    });
    const sendText = document.createElement("span");
    sendText.innerText = 'Send';
    send.appendChild(sendIcon);
    send.appendChild(sendText);

    postFooter.appendChild(like);
    postFooter.appendChild(comment);
    postFooter.appendChild(repost);
    postFooter.appendChild(send);
}

function handleLeftAndRightButtons(post) {
    const allImages = post.querySelectorAll('.postImg');
    const slideLeftButton = post.querySelector('.slideLeftButton');
    const slideRightButton = post.querySelector('.slideRightButton');
    let currentIndex = 0;

    function showImage(index) {
        allImages.forEach(image => {
            image.classList.remove('activeImage');
        });
        if(allImages.length !== 0) allImages[index].classList.add('activeImage');
        slideLeftButton.classList.toggle('hideButton', index === 0);
        slideRightButton.classList.toggle('hideButton', index === allImages.length - 1);
    }

    slideLeftButton.onclick = function() {
        if(currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        }
    }

    slideRightButton.onclick = function() {
        if(currentIndex < allImages.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    }

    showImage(currentIndex);
}