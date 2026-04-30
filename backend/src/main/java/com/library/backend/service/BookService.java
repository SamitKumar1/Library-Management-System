package com.library.backend.service;
import com.library.backend.entity.Book;
import com.library.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository repository;

    public Book addBook(Book book) {
        return repository.save(book);
    }

    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    public void deleteBook(Long id) {
        repository.deleteById(id);
    }
    public Book updateBook(Long id, Book newBook) {
        Book book = repository.findById(id).orElseThrow();
        book.setTitle(newBook.getTitle());
        book.setAuthor(newBook.getAuthor());
        return repository.save(book);
    }

    public List<Book> searchBooks(String keyword) {
        return repository.findByTitleContainingIgnoreCase(keyword);
    }
}
