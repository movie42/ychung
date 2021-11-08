const contentId = document.querySelector('.contents_wrapper');
const commentForm = document.querySelector('.comments_form_wrapper');
const postCommentBtn = commentForm.querySelector('button');
const commentTextarea = commentForm.querySelector('textarea');
const commentItemWrapper = document.querySelector('.comments_item_wrapper');
const commentList = commentItemWrapper.querySelector('ul');
const listLength = commentList.getElementsByClassName('comment_item');

const addComment = (text, id, userName) => {
	const ul = document.querySelector('.comments_item_wrapper ul');
	const newComment = document.createElement('li');
	const userTextWrapper = document.createElement('div');
	const commetInform = document.createElement('div');
	const spanCreator = document.createElement('span');
	const spanText = document.createElement('span');
	const deleteButton = document.createElement('span');
	const editButton = document.createElement('span');
	spanText.innerText = text;
	spanCreator.innerText = userName;
	deleteButton.innerText = '삭제';
	editButton.innerText = '수정 ';
	deleteButton.className = 'delete_button';
	deleteButton.addEventListener('click', handleDeleteComment);
	editButton.className = 'edit_button';
	newComment.className = 'comment_item';
	spanCreator.className = 'comment_creator';
	userTextWrapper.className = 'comment_user_text_wrapper';
	commetInform.className = 'comment_infom_button_wrapper';
	newComment.dataset.id = id;
	userTextWrapper.appendChild(spanCreator);
	userTextWrapper.appendChild(spanText);
	commetInform.appendChild(editButton);
	commetInform.appendChild(deleteButton);
	newComment.appendChild(userTextWrapper);
	newComment.appendChild(commetInform);
	ul.prepend(newComment);
};

const handleDeleteComment = async (e) => {
	const commentBody = e.target.parentElement.parentElement;
	const commentId = document.querySelector('.comment_item');
	const { id } = commentId.dataset;
	const response = await fetch(`/api/${id}/comments/delete`, {
		method: 'GET',
	});
	if (response.status === 200) commentBody.remove();
};

const handlePostComments = async (e) => {
	e.preventDefault();
	const { id } = contentId.dataset;
	const pathName = location.pathname.split('/')[1];

	// get textarea value
	const text = commentTextarea.value;
	if (text === '') {
		return '';
	}
	// post to back-end
	const response = await fetch(`/api/${id}/comments`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text, pathName }),
	});
	if ((await response.status) === 201) {
		commentTextarea.value = '';
		const { newComment, userName } = await response.json();
		addComment(text, newComment, userName);
	}
};

if (commentForm) {
	postCommentBtn.addEventListener('click', handlePostComments);
}

if (listLength.length > 0) {
	for (let i = 0; i < listLength.length; i++) {
		const deleteBtn = listLength[i].querySelector('.delete_button');
		deleteBtn.addEventListener('click', handleDeleteComment);
	}
}
