import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";
import { Comment } from "../types";
import { UserProvider, useUserContext } from "../User.provider";

type CommentItemProps = {
  comment: Comment,
  removeComment: (id:number, userId: number) => void
}

export const CommentItem: React.FC<CommentItemProps> = ({comment, removeComment}) => {

  const {user} = useUserContext();


  const handleDelete = () => {
    removeComment(comment.id, comment.userId);
  }

  return (
    <View style={styles.commentItem}>
      <View style={styles.commentWithButton}>
        <Text style={styles.commentUser}>{comment.user.username}:</Text>
        {comment.user.id === user!.id ? 
          <Pressable onPress={handleDelete}>
            <Text style={styles.deleteButton}>x</Text>
          </Pressable>: undefined
        }
      </View>
      <Text style={styles.commentBody}>{comment.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commentItem: {
    borderBottomColor:'#ccc',
    borderBottomWidth: 0.2,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  commentUser: {
    fontWeight: '600',
    fontSize: 20,
    color: theme.buttonColor,
    marginBottom: 5
  },
  commentBody: {
    color: theme.textDark,
    fontSize: 16,
    width: '100%'
  },
  deleteButton: {
    color: 'red',
    fontSize: 20,
    fontWeight: '900'
  },
  commentWithButton: {
    flexDirection:'row',
    justifyContent: 'space-between'
  }
});