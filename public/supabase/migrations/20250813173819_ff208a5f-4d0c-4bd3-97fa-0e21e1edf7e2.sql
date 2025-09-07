-- Seed the products table with default products using gen_random_uuid() for proper UUID format
INSERT INTO public.products (name, slug, price, description, images, category, trending, popular) VALUES
('Handcrafted Canvas Art', 'handcrafted-canvas-art', 120, 'Vibrant handmade canvas perfect for modern interiors.', ARRAY['/placeholder.svg'], 'arts', true, false),
('Ceramic Vase Duo', 'ceramic-vase-duo', 45, 'Minimal ceramic vases for home and office decor.', ARRAY['/placeholder.svg'], 'decorations', true, true),
('Nordic Lounge Chair', 'nordic-lounge-chair', 240, 'Comfort-first lounge chair with solid wood legs.', ARRAY['/placeholder.svg'], 'furniture', false, true),
('Framed Wall Art Set', 'framed-wall-art-set', 89, 'Set of 3 abstract wall art prints with frames.', ARRAY['/placeholder.svg'], 'decorations', true, false),
('Minimal Study Desk', 'minimal-study-desk', 150, 'Space-saving desk with cable management.', ARRAY['/placeholder.svg'], 'furniture', false, false),
('Office Desk Organizer', 'office-desk-organizer', 25, 'Keeps pens, notes, and accessories tidy.', ARRAY['/placeholder.svg'], 'decorations', false, false);

-- Create trigger for automatic timestamp updates (if not exists)
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();