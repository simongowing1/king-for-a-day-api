import app from '../index'

type Artwork = {
  id: string
  title: string
  page: number
}

describe('GET /', () => {
  it('returns API metadata', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toMatchObject({
      name: 'King for a Day',
      endpoints: {
        random: '/artwork/random',
        byId: '/artwork/:id',
        byPage: '/artwork?page=<number>',
      },
    })
  })
})

describe('GET /artwork/random', () => {
  it('returns a valid artwork', async () => {
    const res = await app.request('/artwork/random')
    expect(res.status).toBe(200)
    const body = await res.json() as Artwork
    expect(typeof body.id).toBe('string')
    expect(body.id.length).toBeGreaterThan(0)
    expect(typeof body.title).toBe('string')
    expect(body.title.length).toBeGreaterThan(0)
    expect(typeof body.page).toBe('number')
  })

  it('returns different artworks across multiple requests', async () => {
    const ids = new Set<string>()
    for (let i = 0; i < 20; i++) {
      const res = await app.request('/artwork/random')
      const body = await res.json() as Artwork
      ids.add(body.id)
    }
    expect(ids.size).toBeGreaterThan(1)
  })
})

describe('GET /artwork/:id', () => {
  it('returns the correct artwork for a known id', async () => {
    const res = await app.request('/artwork/1')
    expect(res.status).toBe(200)
    const body = await res.json() as Artwork
    expect(body.id).toBe('1')
    expect(body.title).toBe('King for a Day piece.')
    expect(body.page).toBe(44)
  })

  it('returns 404 for a non-existent id', async () => {
    const res = await app.request('/artwork/99999')
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body).toEqual({ error: 'Artwork not found' })
  })

  it('returns artwork for id "2"', async () => {
    const res = await app.request('/artwork/2')
    expect(res.status).toBe(200)
    const body = await res.json() as Artwork
    expect(body.id).toBe('2')
  })
})

describe('GET /artwork?page=<n>', () => {
  it('returns artworks for a valid page number', async () => {
    const res = await app.request('/artwork?page=44')
    expect(res.status).toBe(200)
    const body = await res.json() as Artwork[]
    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBeGreaterThan(0)
    body.forEach((artwork) => {
      expect(artwork.page).toBe(44)
    })
  })

  it('returns 404 for a page with no artworks', async () => {
    const res = await app.request('/artwork?page=9999')
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body).toEqual({ error: 'No artworks on that page' })
  })

  it('returns 400 for a non-numeric page', async () => {
    const res = await app.request('/artwork?page=abc')
    expect(res.status).toBe(400)
  })

  it('returns 400 for a zero page value', async () => {
    const res = await app.request('/artwork?page=0')
    expect(res.status).toBe(400)
  })

  it('returns 400 for a negative page value', async () => {
    const res = await app.request('/artwork?page=-1')
    expect(res.status).toBe(400)
  })

  it('returns 400 when page param is missing', async () => {
    const res = await app.request('/artwork')
    expect(res.status).toBe(400)
  })
})

describe('GET /viewer', () => {
  it('returns an HTML page', async () => {
    const res = await app.request('/viewer')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/html')
  })
})

describe('GET /viewer/:id', () => {
  it('returns an HTML page for a known artwork id', async () => {
    const res = await app.request('/viewer/1')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/html')
  })

  it('returns 404 for a non-existent artwork id', async () => {
    const res = await app.request('/viewer/99999')
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body).toEqual({ error: 'Artwork not found' })
  })
})
