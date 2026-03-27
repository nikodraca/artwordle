# artwordle

I really liked the Wordle emoji art and wanted to do something with it, had this idea to build an album artwork generator in the same style.

The process was pretty simple:

1. Break the image apart into `n` squares evenly
2. For each square, find the average colour (this happened client-side)
3. For each color, find the closes emoji square
4. Reconstruct the artwork

One really cool thing was playing with the n - as you added more squares you had better "resolution". Enhance!

Read more [here](https://www.nikodraca.com/projects/14-artwordle)

## Getting Started

Install dependencies and run `vercel dev`. You'll need a Spotify access token as well
