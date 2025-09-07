-- Reset password for admin user
UPDATE auth.users 
SET encrypted_password = crypt('admin123', gen_salt('bf'))
WHERE email = 'kelvinpius817@gmail.com';