import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostPayload} from './post-payload';
import {AddPostService} from '../add-post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('', Validators.required);
  body = new FormControl('', Validators.required);

  constructor(private addpostService: AddPostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id: '',
      content: '',
      title: '',
      username: ''
    }
  }

  ngOnInit() {
  }

  addPost() {
    if (this.addPostForm.dirty && this.addPostForm.valid) {
      this.postPayload.content = this.addPostForm.get('body').value;
      this.postPayload.title = this.addPostForm.get('title').value;
      this.addpostService.addPost(this.postPayload).subscribe(data => {
        this.router.navigateByUrl('/');
      }, error => {
        console.log('Failure Response');
      });
    } else {
      this.addPostForm.markAsTouched();
    }
  }
}
