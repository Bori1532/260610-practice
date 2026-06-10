import { useState } from 'react'

const initialPosts = [
  {
    id: 1,
    title: '새로운 금융 지원 프로그램 안내',
    author: '관리자',
    content: '상용차 및 건설기계 고객을 위한 새로운 금융 지원 프로그램이 시작되었습니다.',
    likes: 12,
    comments: [
      {
        id: 1,
        author: '홍길동',
        content: '좋은 정보 감사합니다. 자세한 안내 부탁드립니다.',
      },
    ],
  },
  {
    id: 2,
    title: '게시판 테스트 게시물입니다',
    author: '홍길동',
    content: '이 게시물은 테스트용입니다. 좋아요 버튼이 정상 작동하는지 확인해주세요.',
    likes: 8,
    comments: [],
  },
]

export default function BoardPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState({ title: '', author: '', content: '' })
  const [commentInputs, setCommentInputs] = useState({})

  const handleLike = (id) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post,
      ),
    )
  }

  const handleNewPostChange = (e) => {
    const { name, value } = e.target
    setNewPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewPostSubmit = (e) => {
    e.preventDefault()
    if (!newPost.title.trim() || !newPost.author.trim() || !newPost.content.trim()) {
      return
    }

    const nextId = posts.length ? Math.max(...posts.map((post) => post.id)) + 1 : 1
    const createdPost = {
      id: nextId,
      title: newPost.title,
      author: newPost.author,
      content: newPost.content,
      likes: 0,
      comments: [],
    }

    setPosts((current) => [createdPost, ...current])
    setNewPost({ title: '', author: '', content: '' })
  }

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }))
  }

  const handleAddComment = (postId) => {
    if (!commentInputs[postId]?.trim()) {
      return
    }

    setPosts((current) =>
      current.map((post) => {
        if (post.id !== postId) return post
        const nextCommentId = post.comments.length
          ? Math.max(...post.comments.map((comment) => comment.id)) + 1
          : 1
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: nextCommentId,
              author: '방문자',
              content: commentInputs[postId].trim(),
            },
          ],
        }
      }),
    )
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }))
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-950 mb-2">게시판</h1>
          <p className="text-slate-600">새 글 작성과 댓글 기능을 통해 게시판을 체험해보세요.</p>
        </div>

        <section className="mb-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950 mb-4">글쓰기</h2>
          <form className="grid gap-4" onSubmit={handleNewPostSubmit}>
            <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
              <input
                name="title"
                value={newPost.title}
                onChange={handleNewPostChange}
                placeholder="제목을 입력하세요"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#f26704] focus:outline-none"
              />
              <input
                name="author"
                value={newPost.author}
                onChange={handleNewPostChange}
                placeholder="작성자"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#f26704] focus:outline-none"
              />
            </div>
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleNewPostChange}
              placeholder="내용을 입력하세요"
              rows={5}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-[#f26704] focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#f26704] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              글 등록하기
            </button>
          </form>
        </section>

        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950">{post.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">작성자 {post.author}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleLike(post.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f26704] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                >
                  좋아요 {post.likes}
                </button>
              </div>
              <p className="mt-6 text-slate-700 leading-7">{post.content}</p>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-slate-950 mb-4">댓글</h3>
                <div className="space-y-4">
                  {post.comments.length ? (
                    post.comments.map((comment) => (
                      <div key={comment.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-semibold text-slate-800">{comment.author}</p>
                        <p className="mt-2 text-slate-600 leading-7">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">첫 댓글을 남겨보세요.</p>
                  )}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    placeholder="댓글을 입력하세요"
                    className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#f26704] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddComment(post.id)}
                    className="inline-flex items-center justify-center rounded-full bg-[#1f2937] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    등록
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
