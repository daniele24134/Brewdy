import { format } from "date-fns";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { global, theme } from "../theme";
import { useThemeContext } from "../Theme.provider";
import { Comment } from "../types";
import { UserProvider, useUserContext } from "../User.provider";
import { TrashIcon } from "./Icons";

type CommentItemProps = {
  comment: Comment,
  removeComment: (id:number, userId: number) => void
}

export const CommentItem: React.FC<CommentItemProps> = ({comment, removeComment}) => {

  const {user} = useUserContext();
  const { themeStyle } = useThemeContext();

  const handleDelete = () => {
    removeComment(comment.id, comment.userId);
  }

  return (
    <View style={styles.commentItem}>
      <View style={styles.commentWithButton}>
        <Text style={[styles.commentUser, global.semibold]}>{comment.user.username}:</Text>
        {comment.user.id === user!.id ? 
          <Pressable onPress={handleDelete}>
            <TrashIcon size={25} color={themeStyle.text}/>
          </Pressable>: undefined
        }
      </View>
      <View>
        <Text style={[styles.commentBody, global.medium, {color: themeStyle.text}]}>
          {comment.body}
        </Text>
        <Text style={[global.bold, styles.commentDate]}>
          {format(new Date(comment.createdAt), "dd MMM Y, 'at' h:mmaaa")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.2,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  commentUser: {
    fontWeight: '600',
    fontSize: 20,
    color: theme.buttonColor,
    marginBottom: 5,
  },
  commentBody: {
    color: theme.textDark,
    fontSize: 14,
    width: '100%',
  },
  deleteButton: {
    color: 'red',
    fontSize: 20,
    fontWeight: '900',
  },
  commentWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentDate: {
    marginTop: 5,
    color: theme.pinkbg,
    fontSize: 12,
  },
});