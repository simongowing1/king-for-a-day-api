import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import artworks from './data/artworks.json'
import { viewerHtml } from './views/viewer'

type Artwork = {
  id: string
  title: string
  page: number
}

const db = artworks as Artwork[]

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    name: 'King for a Day',
    description: 'An API of 1000 artwork titles from Bruce McLean\'s 1969 artwork, \'King for a Day\'.',
    endpoints: {
      random: '/artwork/random',
      byId: '/artwork/:id',
      byPage: '/artwork?page=<number>',
    },
  })
})

app.get('/artwork/random', (c) => {
  const artwork = db[Math.floor(Math.random() * db.length)]
  if (!artwork) return c.json({ error: 'No artworks found' }, 500)
  return c.json(artwork)
})

const idSchema = z.object({ id: z.string().min(1) })

app.get('/artwork/:id', zValidator('param', idSchema), (c) => {
  const { id } = c.req.valid('param')
  const artwork = db.find((a) => a.id === id)
  if (!artwork) return c.json({ error: 'Artwork not found' }, 404)
  return c.json(artwork)
})

const pageSchema = z.object({ page: z.coerce.number().int().positive() })

app.get(
  '/artwork',
  zValidator('query', pageSchema),
  (c) => {
    const { page } = c.req.valid('query')
    const results = db.filter((a) => a.page === page)
    if (results.length === 0) return c.json({ error: 'No artworks on that page' }, 404)
    return c.json(results)
  }
)

app.get('/viewer', (c) => {
  return c.html(viewerHtml('/artwork/random'))
})

app.get('/viewer/:id', zValidator('param', idSchema), (c) => {
  const { id } = c.req.valid('param')
  const artwork = db.find((a) => a.id === id)
  if (!artwork) return c.json({ error: 'Artwork not found' }, 404)
  return c.html(viewerHtml(`/artwork/${id}`))
})

export default app
