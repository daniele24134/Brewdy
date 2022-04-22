import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, ScrollView, Alert, TextInput, Pressable} from 'react-native';
import { createComment, deleteComment, getBeerByBid, getComments } from "../services/backService";
import { theme } from "../theme";
import { Comment, DbBeer } from "../types";
import { useUserContext } from "../User.provider";
import { CommentItem } from "./CommentItem";

type CommentSectionProps = {
  bid: number
}

export const CommentSection:React.FC<CommentSectionProps> = ({bid}) => {

  const {user} = useUserContext();

  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('');

  useEffect(()=> {
    getComments(bid).then(
      (data: Comment[]) => {
        setComments(data);
      },
      (e: any) => { Alert.alert('No Comments') }
    )
  },[]);

  const removeComment = (id: number, userId: number) => {
    deleteComment(id, userId).then(
      (data) => {
        setComments(prev => prev.filter(c => c.id !== data.id));
      },
      (e:any) => {Alert.alert('Not authorized to delete this comment')}
    )
  }

  const addComment = () => {
    if (newComment.length === 0) return;
    const commentToAdd = {body: newComment, beerId: bid, userId: user!.id };
    createComment(commentToAdd).then(
      (data: Comment) => {
        setComments(prev => [...prev, data]);
        setNewComment('');
      },
      (e:any) => {Alert.alert('Comment not created')}
    )
  }

  return (

    <View style={styles.container}>
      <Text style={styles.commentSectionTitle}>Comments</Text>
      <ScrollView style={styles.commentSection}>
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} removeComment={removeComment}/>
        ))}
      </ScrollView>
      <View style={styles.sendComment}>
        <TextInput
          style={styles.commentInput}
          value={newComment}
          onChangeText={setNewComment}
          placeholder={'Write a comment...'}
          placeholderTextColor={'rgba(250,250,250,0.4)'}
        />
        <Pressable style={styles.sendButton} onPress={addComment}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  commentSectionTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
    color: theme.buttonColor
  },
  commentSection: {
    borderColor: theme.bluebg,
    borderWidth:2,
    borderRadius:10,

    marginBottom: 10,
  },
  commentInput: {
    backgroundColor: theme.bluebg,
    color: theme.textDark,
    width: '90%',
    height: 30,
    padding: 10,
    borderRadius: 5,
    fontSize:16,
    marginRight: 10
  },
  sendComment: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0
  },
  sendButton:{
    height: 30,
    backgroundColor: theme.buttonColor,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent:'center',
    paddingHorizontal:10,
  },
  sendText: {
    fontWeight: '600',
    color: theme.textDark
  }
})