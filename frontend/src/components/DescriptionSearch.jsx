import React from 'react'

const DescriptionSearch = () => {
  return (
<div className="w-full max-w-sm border border-neutral-500 bg-base-100">
  <div className="p-4 space-y-5">

    {/* Header */}
    <div>
      <h2 className="text-sm font-semibold tracking-widest uppercase">
        Movie Discovery
      </h2>
      <p className="text-xs opacity-60 mt-1">
        Describe the movie you want — type or speak
      </p>
    </div>

    {/* Text + Mic */}
    <section className="space-y-3">
      <div className="relative">
        <textarea
          placeholder="A dark psychological thriller set in space..."
          rows={3}
          className="w-full border border-neutral-500 px-3 py-2 pr-10
          text-sm resize-none focus:outline-none
          focus:border-neutral-900"
        />

        {/* Mic Button */}
        <button
          className="absolute bottom-2 right-2 w-7 h-7
          flex items-center justify-center
          border border-neutral-500
          hover:bg-neutral-200 text-xs"
        >
          🎙
        </button>
      </div>

      <p className="text-xs opacity-50">
        Be specific about mood, theme, or setting.
      </p>
    </section>

    {/* Quick Suggestions */}
    <section>
      <p className="text-xs uppercase tracking-widest opacity-70 mb-2">
        Quick Ideas
      </p>

      <div className="flex flex-wrap gap-2">
        <button className="border border-neutral-500 px-2 py-1 text-[11px] hover:bg-neutral-200">
          Dark crime thriller
        </button>
        <button className="border border-neutral-500 px-2 py-1 text-[11px] hover:bg-neutral-200">
          Feel-good romance
        </button>
        <button className="border border-neutral-500 px-2 py-1 text-[11px] hover:bg-neutral-200">
          Sci-fi adventure
        </button>
      </div>
    </section>

    {/* Search Button */}
    <button
      className="w-full border border-neutral-900 px-4 py-2
      text-sm font-semibold tracking-widest uppercase
      hover:bg-neutral-900 hover:text-white"
    >
      Find Movies
    </button>

  </div>
</div>
  )
}

export default DescriptionSearch
