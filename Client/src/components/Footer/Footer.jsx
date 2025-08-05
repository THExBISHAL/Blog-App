function Footer() {
  return (
    <footer className="bg-cyan-700 text-yellow-500 text-center py-5 text-sm">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Blog. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
